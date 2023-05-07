export const SET_IS_MOBILE = 'SET_IS_MOBILE'
export const SET_IS_LOADING = 'SET_IS_LOADING'
export const MOBILE_MAX_WIDTH = 744

export interface AppStateProps {
    isMobile: boolean
    isLoading: boolean
}

type AppAction = { type: 'SET_IS_MOBILE'; isMobile: boolean } | { type: 'SET_IS_LOADING'; isLoading: boolean }

const initialState = {
    isMobile: window.innerWidth < MOBILE_MAX_WIDTH,
    isLoading: false,
}

export function appReducer(state = initialState, action: AppAction) {
    switch (action.type) {
        case SET_IS_MOBILE:
            return { ...state, isMobile: action.isMobile }
        case SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading }
        default: {
            console.log('Went to deafult att appReducer')
            return state
        }
    }
}
