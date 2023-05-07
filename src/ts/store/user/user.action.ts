import { ReserveByProps } from '../../interfaces/reserve-by-interface'
import { StayProps } from '../../interfaces/stay-interface'
import { ReservationProps, UserLoginProps, UserProps } from '../../interfaces/user-interface'
import { stayService } from '../../services/stay.service'
import { userService } from '../../services/user.service'
import { utilService } from '../../services/util.service'
import { store } from '../store'
import { SET_USER } from './user.reducer'

export async function login(credentials: UserLoginProps) {
    try {
        const user = await userService.login(credentials)
        store.dispatch({ type: SET_USER, user })
        return user
    } catch (err) {
        console.error('Failed to login in user.actions with error:', err)
        throw err
    }
}

export async function signup(credentials: UserProps) {
    try {
        const user = await userService.signup(credentials)
        store.dispatch({ type: SET_USER, user })
        return user
    } catch (err) {
        console.log('Failed to signup in user.actions with error:', err)
        throw err
    }
}

export async function logout() {
    try {
        await userService.logout()
        store.dispatch({
            type: SET_USER,
            user: null,
        })
    } catch (err) {
        console.log('Cannot logout', err)
        throw err
    }
}

export async function demoUserLogin() {
    const demoUserCreds = { username: 'Demo123', password: 'Demo123' }
    return login(demoUserCreds)
}

export async function updateWishList(user: UserProps, stayId: string) {
    try {
        // Checking if the stayId is already in the wish list
        // If so returning updatedWishList excluding the clicked stay
        // If not returning updatedWishList including the clicked stay
        const isRemoving = user.wishListStaysId.includes(stayId)
        const updatedWishList = isRemoving
            ? user.wishListStaysId.filter(savedStayId => savedStayId !== stayId)
            : [...user.wishListStaysId, stayId]
        // Optimistic approach
        store.dispatch({ type: SET_USER, user: { ...user, wishListStaysId: updatedWishList } })
        await userService.update({ ...user, wishListStaysId: updatedWishList })
    } catch (err) {
        console.log(user)
        store.dispatch({ type: SET_USER, user })
        console.log(err)
        throw new Error('Failed to save to wish list, try again later.')
    }
}

export async function setUserListings(loggedInUser: UserProps) {
    try {
        const userListings: StayProps[] = await stayService.getStays(loggedInUser.listingsId)
        const updatedUser: UserProps = userService.loadUsersDemoData({ ...loggedInUser, listings: userListings })
        userService.saveLocalUser(updatedUser)
        store.dispatch({ type: SET_USER, user: updatedUser })
        return userListings
    } catch (err) {
        console.log('Failed to load user listings with error:', err)
        throw new Error('Cannot load listings, try again later.')
    }
}

export async function setUserWishListStays(loggedInUser: UserProps) {
    try {
        const userWishListStays: StayProps[] = await stayService.getStays(loggedInUser.wishListStaysId)
        const updatedUser: UserProps = { ...loggedInUser, wishListStays: userWishListStays }
        userService.saveLocalUser(updatedUser)
        store.dispatch({ type: SET_USER, user: updatedUser })
    } catch (err) {
        console.log('Failed to load user wish list stays with error:', err)
        throw new Error('Cannot load wishlist, try again later')
    }
}

export async function addReservation(
    reserveBy: ReserveByProps,
    nightsCount: number,
    loggedInUser: UserProps,
    stay: StayProps
) {
    try {
        const reservation = {
            _id: utilService.makeId(),
            stayId: stay._id,
            stayName: stay.name,
            stayLocation: {
                city: stay.loc.city,
                lat: stay.loc.lat,
                lng: stay.loc.lng,
            },
            stayImgsUrl: stay.imgUrls,
            host: stay.host,
            guestId: loggedInUser._id,
            guestName: loggedInUser.fullName,
            reservationDates: {
                checkIn: reserveBy.checkIn,
                checkOut: reserveBy.checkOut,
            },
            bookedAt: new Date(),
            totalPayout: nightsCount * stay.price,
            guests: reserveBy.guests,
            status: 'pending',
        }
        const updatedGuest: UserProps = await userService.addReservation(reservation, loggedInUser)
        store.dispatch({ type: SET_USER, user: updatedGuest })
    } catch (err) {
        throw new Error('Cannot complete reservation, try again later')
    }
}

// export async function setUserTripsStays(loggedInUser: UserProps) {
//     try {
//         const tripsStaysId = loggedInUser.trips.map(trip => trip.stayId)
//         const userTripsStays: StayProps[] = await stayService.getStays(tripsStaysId)
//         const updatedUser: UserProps = { ...loggedInUser, tripsStays: userTripsStays }
//         userService.saveLocalUser(updatedUser)
//         store.dispatch({ type: SET_USER, user: updatedUser })
//     } catch (err) {
//         console.log('Failed to load user trips stays with error:', err)
//         throw new Error('Cannot load trips, try again later')
//     }
// }

export async function addListing(user: UserProps, stayId: string) {
    try {
        const updatedUser = await userService.update({ ...user, listingsId: [...user.listingsId, stayId] })
        store.dispatch({ type: SET_USER, user: updatedUser })
    } catch (err) {
        console.log('Failed to add user listing with error :', err)
        throw new Error('Cannot add listing, try again later')
    }
}

export async function changeReservationStatus(host: UserProps, reservation: ReservationProps, isApproved: boolean) {
    try {
        const updatedStatus = isApproved ? 'approved' : 'rejected'
        const updatedReservation: ReservationProps = { ...reservation, status: updatedStatus }
        const updatedHostReservations = host.listingReservations?.map(listingReservation =>
            listingReservation._id === reservation._id ? updatedReservation : listingReservation
        )
        const updatedHost = { ...host, listingReservations: updatedHostReservations }
        store.dispatch({ type: SET_USER, user: updatedHost })

        userService.updateReservation(updatedHost, updatedReservation)
    } catch (err) {
        console.log('Failed to change reservation status with error:', err)
        store.dispatch({ type: SET_USER, user: host })
        throw new Error('Cannot change reservation status, try again later')
    }
}
