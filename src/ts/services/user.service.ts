import { UserLoginProps, UserProps } from '../interfaces/user-interface'
import { httpService } from './http.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const BASE_URL: string = 'user/'

export const userService = {
    getUsers,
    login,
    demoLogin,
    signup,
    logout,
    saveLocalUser,
    getLoggedinUser,
    getById,
    update,
    getUserDefaultCreds,
}

function getUsers() {
    return httpService.get(BASE_URL)
}

async function signup(credentials: UserProps) {
    try {
        const user = await httpService.post('auth/signup', credentials)
        return saveLocalUser(user)
    } catch (err) {
        console.log(err)
        throw new Error('Try again later')
    }
}

async function login(credentials: UserLoginProps) {
    try {
        const user = await httpService.post('auth/login', credentials)
        if (user) {
            return saveLocalUser(user)
        }
        throw new Error('Invalid username or password')
    } catch (err) {
        console.log(err)
        throw new Error('Try again later')
    }
}

async function demoLogin() {
    try {
        const demoUser = await httpService.post('auth/demo')
        return saveLocalUser(demoUser)
    } catch (err) {
        console.log('Failed to demo login with error:', err)
        throw new Error('Cannot login with demo user, signup or try again later')
    }
}

async function logout() {
    try {
        httpService.post('auth/logout')
        sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    } catch (err) {
        console.log(err)
        throw new Error('Cannot logout, Try again later')
    }
}

async function getById(userId: string) {
    return httpService.get(BASE_URL + userId)
}

async function update(credentials: UserProps) {
    const updatedUser = await httpService.put(BASE_URL + credentials._id, credentials)
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
        fullname: '',
        username: '',
        password: '',
        imgUrl: '',
        wishListStaysId: [],
        listingsId: [],
        tripsId: [],
    }
}

function saveLocalUser(user: UserProps) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}
