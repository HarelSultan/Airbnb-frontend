import { UserLoginProps, UserProps } from '../interfaces/user-interface'
import { storageService } from './async-storage.service'
import { utilService } from './util.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const STORAGE_KEY_USER_DB = 'user_DB'

export const userService = {
    login,
    signup,
    logout,
    getUserDefaultCreds,
    getLoggedinUser,
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
        return _saveLocalUser(user)
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
            return _saveLocalUser(user)
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

function getLoggedinUser() {
    const loggedinUser = sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER)
    return loggedinUser ? JSON.parse(loggedinUser) : null
}

function getUserDefaultCreds(): UserProps {
    return {
        _id: '',
        fullName: '',
        username: '',
        password: '',
    }
}

function _saveLocalUser(user: UserProps) {
    console.log(user)
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

async function _createDemoUser() {
    if (utilService.loadFromStorage(STORAGE_KEY_USER_DB)) return
    return signup({ _id: 'Demo555', fullName: 'DemoUser', username: 'Demo123', password: 'Demo123' })
}
