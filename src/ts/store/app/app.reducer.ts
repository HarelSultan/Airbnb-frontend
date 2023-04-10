export const SET_IS_MOBILE = 'SET_IS_MOBILE'
export const MOBILE_MAX_WIDTH = 744

export interface AppStateProps {
    isMobile: boolean
}

type AppAction = { type: 'SET_IS_MOBILE'; isMobile: boolean }

const initialState = {
    isMobile: window.innerWidth < MOBILE_MAX_WIDTH,
}

export function appReducer(state = initialState, action: AppAction) {
    switch (action.type) {
        case SET_IS_MOBILE:
            return { ...state, isMobile: action.isMobile }
        default: {
            console.log('Went to deafult att appReducer')
            return state
        }
    }
}
