import { store } from '../store'
import { SET_IS_LOADING, SET_IS_MOBILE } from './app.reducer'

export async function setIsMobile(isMobile: boolean) {
    store.dispatch({ type: SET_IS_MOBILE, isMobile })
}

export async function setIsLoading(isLoading: boolean) {
    store.dispatch({ type: SET_IS_LOADING, isLoading })
}
