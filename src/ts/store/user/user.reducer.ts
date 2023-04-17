import { UserProps } from '../../interfaces/user-interface'
import { userService } from '../../services/user.service'

export const SET_LOGGED_IN_USER = 'SET_LOGGED_IN_USER'

export interface UserStateProps {
    loggedInUser: UserProps | null
}

export type UserAction = { type: 'SET_LOGGED_IN_USER'; user: UserProps | null }

const initialState: UserStateProps = {
    loggedInUser: userService.getLoggedinUser(),
}

export function userReducer(state = initialState, action: UserAction) {
    switch (action.type) {
        case SET_LOGGED_IN_USER:
            return { ...state, loggedInUser: action.user }

        default: {
            console.log('Went to default at userReducer')
            return state
        }
    }
}
