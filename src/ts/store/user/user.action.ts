import { store } from '../store'
import { SET_USER } from './user.reducer'
import { stayService } from '../../services/stay.service'
import { userService } from '../../services/user.service'
import { reservationService } from '../../services/reservation.service'
import { ReserveByProps } from '../../interfaces/reserve-by-interface'
import { StayProps } from '../../interfaces/stay-interface'
import { ReservationProps, UserLoginProps, UserProps } from '../../interfaces/user-interface'

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
    try {
        const demoUser = await userService.demoLogin()
        store.dispatch({ type: SET_USER, user: demoUser })
        return demoUser
    } catch (err) {
        console.log('Cannot demo login with error:', err)
        throw new Error('Cannot demo login, signup or try again later.')
    }
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
        let updatedUser = { ...user, wishListStaysId: updatedWishList }
        if (isRemoving && user.wishListStays?.length) {
            const updatedWishListStays = user.wishListStays.filter(stay => stay._id !== stayId)
            updatedUser = { ...updatedUser, wishListStays: updatedWishListStays }
        }
        // Optimistic approach
        store.dispatch({ type: SET_USER, user: updatedUser })
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
        const userListings: StayProps[] = await stayService.getUserStays(loggedInUser.listingsId)
        const updatedUser: UserProps = { ...loggedInUser, listings: userListings }
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
        const userWishListStays: StayProps[] = await stayService.getUserStays(loggedInUser.wishListStaysId)
        const updatedUser: UserProps = { ...loggedInUser, wishListStays: userWishListStays }
        userService.saveLocalUser(updatedUser)
        store.dispatch({ type: SET_USER, user: updatedUser })
    } catch (err) {
        console.log('Failed to load user wish list stays with error:', err)
        throw new Error('Cannot load wishlist, try again later')
    }
}

export async function setUserTrips(loggedInUser: UserProps) {
    try {
        const userTrips: ReservationProps[] = await reservationService.query(loggedInUser.tripsId)
        const updatedUser: UserProps = { ...loggedInUser, trips: userTrips }
        userService.saveLocalUser(updatedUser)
        store.dispatch({ type: SET_USER, user: updatedUser })
    } catch (err) {
        console.log('Failed to load user trips with error:', err)
        throw new Error('Cannot load your trips, try again later')
    }
}

export async function addReservation(
    reserveBy: ReserveByProps,
    nightsCount: number,
    loggedInUser: UserProps,
    stay: StayProps
) {
    try {
        const updatedUser: UserProps = await reservationService.addReservation(
            reserveBy,
            nightsCount,
            loggedInUser,
            stay
        )
        userService.saveLocalUser(updatedUser)
        store.dispatch({ type: SET_USER, user: updatedUser })
    } catch (err) {
        throw new Error('Cannot complete reservation, try again later')
    }
}

export async function addListing(user: UserProps, stayId: string) {
    try {
        const updatedUser = await userService.update({ ...user, listingsId: [...user.listingsId, stayId] })
        store.dispatch({ type: SET_USER, user: updatedUser })
    } catch (err) {
        console.log('Failed to add user listing with error :', err)
        throw new Error('Cannot add listing, try again later')
    }
}
