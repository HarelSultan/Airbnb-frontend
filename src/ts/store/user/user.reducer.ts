import { userService } from '../../services/user.service'
import { UserProps } from '../../interfaces/user-interface'

export const SET_USER = 'SET_USER'

export interface UserStateProps {
    loggedInUser: UserProps | null
}

export type UserAction = { type: 'SET_USER'; user: UserProps | null }

const initialState: UserStateProps = {
    loggedInUser: userService.getLoggedinUser(),
}

export function userReducer(state = initialState, action: UserAction) {
    switch (action.type) {
        case SET_USER:
            return { ...state, loggedInUser: action.user }

        default: {
            console.log('Went to default at userReducer')
            return state
        }
    }
}
