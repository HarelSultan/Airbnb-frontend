import { ReservationProps, UserLoginProps, UserProps } from '../interfaces/user-interface'
import { storageService } from './async-storage.service'
import { utilService } from './util.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const STORAGE_KEY_USER_DB = 'user_DB'

export const userService = {
    login,
    signup,
    logout,
    saveLocalUser,
    getLoggedinUser,
    update,
    getUserDefaultCreds,
    loadUsersDemoData,
    addReservation,
    updateReservation,
}

_createDemoUser()

function getUsers() {
    return storageService.query(STORAGE_KEY_USER_DB)
}

async function signup(credentials: UserProps) {
    try {
        const users = (await getUsers()) as UserProps[]
        const isUsernameTaken = users.find(user => user.username === credentials.username)
        if (isUsernameTaken) throw new Error('Username already taken.')
        const user = await storageService.post(STORAGE_KEY_USER_DB, credentials)
        return saveLocalUser(user)
    } catch (err) {
        console.log(err)
        throw new Error('Try again later')
    }
}

async function login(credentials: UserLoginProps) {
    try {
        const users = (await getUsers()) as UserProps[]
        const user = users.find(u => u.username === credentials.username && u.password === credentials.password)
        if (user) {
            return saveLocalUser(user)
        }
        throw new Error('Invalid username or password')
    } catch (err) {
        console.log(err)
        throw new Error('Try again later')
    }
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

async function getById(userId: string) {
    return storageService.get(STORAGE_KEY_USER_DB, userId) as Promise<UserProps>
}

async function update(credentials: UserProps) {
    const updatedUser = await storageService.put(STORAGE_KEY_USER_DB, credentials)
    if (getLoggedinUser()?._id === updatedUser._id) saveLocalUser(updatedUser)
    return updatedUser
}

async function addReservation(reservation: ReservationProps, guest: UserProps): Promise<UserProps> {
    try {
        const host = await getById(reservation.host._id)
        const updatedGuestTrips = [...guest.trips, reservation]
        console.log(updatedGuestTrips)
        const updatedHostReservations = host.listingReservations
            ? [...host.listingReservations, reservation]
            : [reservation]
        const updatedGuest = { ...guest, trips: updatedGuestTrips }
        const updatedHost = { ...host, listingReservations: updatedHostReservations }
        console.log(updatedGuest)
        await update(updatedGuest)
        await update(updatedHost)
        return updatedGuest
    } catch (err) {
        console.log('Failed to add reservation with error:', err)
        throw err
    }
}

async function updateReservation(updatedHost: UserProps, updatedReservation: ReservationProps) {
    try {
        const reservationGuest = await getById(updatedReservation.guestId)
        const updatedGuestReservations = reservationGuest.trips.map(trip =>
            trip._id === updatedReservation._id ? updatedReservation : trip
        )
        const updatedGuest = { ...reservationGuest, trips: updatedGuestReservations }
        await update(updatedHost)
        await update(updatedGuest)
        // Should keep reservations db ? Should keep reservations on User and Host
    } catch (err) {
        console.log('Failed to update Reservation with error:', err)
        throw err
    }
}

function getLoggedinUser(): UserProps | null {
    const loggedinUser = sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER)
    return loggedinUser ? JSON.parse(loggedinUser) : null
}

function getUserDefaultCreds(): UserProps {
    return {
        _id: '',
        fullName: '',
        username: '',
        password: '',
        imgUrl: '',
        wishListStaysId: [],
        listingsId: [],
        trips: [],
    }
}

function saveLocalUser(user: UserProps) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

async function _createDemoUser() {
    if (utilService.loadFromStorage(STORAGE_KEY_USER_DB)) return
    const demoHost: UserProps = {
        _id: 'Demo555',
        fullName: 'Chiro De Marzio',
        username: 'Demo123',
        password: 'Demo123',
        imgUrl: 'https://res.cloudinary.com/dp32ucj0y/image/upload/v1674657025/qjkthitcs6pbonblobmi.jpg',
        wishListStaysId: [],
        listingsId: ['yYBFw2', '8ZzQpW', 'rchFGQ'],
        trips: [],
        listingReservations: [],
    }

    utilService.saveToStorage(STORAGE_KEY_USER_DB, [demoHost])
}

function loadUsersDemoData(demoHost: UserProps) {
    if (!demoHost.listings || demoHost.listingReservations?.length) return demoHost

    const demoUser1: UserProps = {
        _id: 'Demo777',
        fullName: 'Jenaro Sabastano',
        username: 'Demo777',
        password: 'Demo777',
        imgUrl: 'https://res.cloudinary.com/dp32ucj0y/image/upload/v1674657025/geec3czlrtp18udpuuyg.jpg',
        wishListStaysId: [],
        trips: [],
        listingsId: [],
    }
    const demoUser2: UserProps = {
        _id: 'Demo888',
        fullName: 'Jenaro Sabastano',
        username: 'Demo888',
        password: 'Demo888',
        imgUrl: 'https://res.cloudinary.com/dp32ucj0y/image/upload/v1674657025/ykdkmw4dzdbd9llcx8kn.jpg',
        wishListStaysId: [],
        trips: [],
        listingsId: [],
    }

    demoHost.listings.map(listing =>
        listing.takenDates.forEach(takenDate => {
            const guest = Math.random() > 0.5 ? demoUser1 : demoUser2
            const randomPastDate = new Date()
            randomPastDate.setDate(randomPastDate.getDate() - utilService.getRandomInt(1, 15))
            const nightsCount =
                utilService.getNightsCount({
                    checkIn: new Date(takenDate.checkIn),
                    checkOut: new Date(takenDate.checkOut),
                }) || 2
            const totalPayout = listing.price * nightsCount
            const reservation = {
                _id: utilService.makeId(),
                stayId: listing._id,
                stayName: listing.name,
                stayLocation: {
                    city: listing.loc.city,
                    lat: listing.loc.lat,
                    lng: listing.loc.lng,
                },
                stayImgsUrl: listing.imgUrls,
                host: listing.host,
                guestId: guest._id,
                guestName: guest.fullName,
                reservationDates: takenDate,
                bookedAt: randomPastDate,
                totalPayout,
                guests: {
                    adults: 3,
                    children: 1,
                    infants: 1,
                    pets: 1,
                },
                status: 'pending',
            }
            guest.trips.push(reservation)
            demoHost.listingReservations?.push(reservation)
        })
    )
    const minifiedDemoHost = JSON.parse(JSON.stringify(demoHost))
    delete minifiedDemoHost.listings
    utilService.saveToStorage(STORAGE_KEY_USER_DB, [minifiedDemoHost, demoUser1, demoUser2])
    return demoHost
}
