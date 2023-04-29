import { UserLoginProps, UserProps } from '../interfaces/user-interface'
import { storageService } from './async-storage.service'
import { stayService } from './stay.service'
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

async function update(credentials: UserProps) {
    const updatedUser = await storageService.put(STORAGE_KEY_USER_DB, credentials)
    if (getLoggedinUser()?._id === updatedUser._id) saveLocalUser(updatedUser)
    return updatedUser
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
        stayWishList: [],
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
        stayWishList: [],
        listingsId: ['yYBFw2', '8ZzQpW', 'rchFGQ'],
        trips: [],
        listingReservations: [],
    }

    // const hostListings = await stayService.getHostListings(demoHost)
    // console.log(hostListings)
    // hostListings.map(listing =>
    //     listing.takenDates.forEach(takenDate => {
    //         const guest = Math.random() > 0.5 ? demoUser1 : demoUser2
    //         const randomPastDate = new Date()
    //         randomPastDate.setDate(randomPastDate.getDate() - utilService.getRandomInt(1, 15))
    //         const nightsCount = utilService.getNightsCount(takenDate) || 2
    //         const totalPayout = listing.price * nightsCount
    //         const reservation = {
    //             stayId: listing._id,
    //             stayName: listing.name,
    //             guestId: guest._id,
    //             reservationDates: takenDate,
    //             bookedAt: randomPastDate,
    //             totalPayout,
    //             status: 'pending',
    //         }
    //         guest.trips.push(reservation)
    //         demoHost.listingReservations?.push(reservation)
    //     })
    // )
    // console.log('demoHost', demoHost)
    // console.log('demoUser1', demoUser1)
    // console.log('demoUser2', demoUser2)
    // utilService.saveToStorage(STORAGE_KEY_USER_DB, [demoHost, demoUser1, demoUser2])
    utilService.saveToStorage(STORAGE_KEY_USER_DB, [demoHost])
}

function loadUsersDemoData(demoHost: UserProps) {
    if (!demoHost.listings) return demoHost

    const demoUser1: UserProps = {
        _id: 'Demo777',
        fullName: 'Jenaro Sabastano',
        username: 'Demo777',
        password: 'Demo777',
        imgUrl: 'https://res.cloudinary.com/dp32ucj0y/image/upload/v1674657025/geec3czlrtp18udpuuyg.jpg',
        stayWishList: [],
        trips: [],
        listingsId: [],
    }
    const demoUser2: UserProps = {
        _id: 'Demo888',
        fullName: 'Jenaro Sabastano',
        username: 'Demo888',
        password: 'Demo888',
        imgUrl: 'https://res.cloudinary.com/dp32ucj0y/image/upload/v1674657025/ykdkmw4dzdbd9llcx8kn.jpg',
        stayWishList: [],
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
                stayId: listing._id,
                stayName: listing.name,
                guestId: guest._id,
                reservationDates: takenDate,
                bookedAt: randomPastDate,
                totalPayout,
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
