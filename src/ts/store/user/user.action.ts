import { StayProps } from '../../interfaces/stay-interface'
import { UserLoginProps, UserProps } from '../../interfaces/user-interface'
import { stayService } from '../../services/stay.service'
import { userService } from '../../services/user.service'
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
        const isRemoving = user.stayWishList.includes(stayId)
        const updatedWishList = isRemoving
            ? user.stayWishList.filter(savedStayId => savedStayId !== stayId)
            : [...user.stayWishList, stayId]
        // Optimistic approach
        store.dispatch({ type: SET_USER, user: { ...user, stayWishList: updatedWishList } })
        await userService.update({ ...user, stayWishList: updatedWishList })
    } catch (err) {
        console.log(user)
        store.dispatch({ type: SET_USER, user })
        console.log(err)
        throw new Error('Failed to save to wish list, try again later.')
    }
}

export async function setUserListings(loggedInUser: UserProps) {
    try {
        const userListings: StayProps[] = await stayService.getHostListings(loggedInUser)
        const updatedUser: UserProps = { ...loggedInUser, listings: userListings }
        userService.saveLocalUser(updatedUser)
        store.dispatch({ type: SET_USER, user: updatedUser })
        return userListings
    } catch (err) {
        console.log('Failed to load user listings with error:', err)
        throw new Error('Cannot load listings, try again later.')
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

// export async function setUser(user:UserProps) {
//     try {
//         const user = await userService.getById(userId)
//         store.dispatch({ type: SET_USER, user })
//         return user
//     } catch (err) {
//         console.error('UserActions: err in loadUser', err)
//         throw err
//     }
// }
