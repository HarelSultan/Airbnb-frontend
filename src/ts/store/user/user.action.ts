import { UserLoginProps, UserProps } from '../../interfaces/user-interface'
import { userService } from '../../services/user.service'
import { store } from '../store'
import { SET_LOGGED_IN_USER } from './user.reducer'

export async function login(credentials: UserLoginProps) {
    try {
        const user = await userService.login(credentials)
        store.dispatch({ type: SET_LOGGED_IN_USER, user })
        return user
    } catch (err) {
        console.error('Failed to login in user.actions with error:', err)
        throw err
    }
}

export async function signup(credentials: UserProps) {
    try {
        const user = await userService.signup(credentials)
        store.dispatch({ type: SET_LOGGED_IN_USER, user })
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
            type: SET_LOGGED_IN_USER,
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

// export async function setUser(user:UserProps) {
//     try {
//         const user = await userService.getById(userId)
//         store.dispatch({ type: SET_LOGGED_IN_USER, user })
//         return user
//     } catch (err) {
//         console.error('UserActions: err in loadUser', err)
//         throw err
//     }
// }
