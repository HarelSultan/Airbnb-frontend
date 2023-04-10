import { combineReducers, legacy_createStore } from 'redux'
import { stayReducer, StayStateProps } from './stay/stay.reducer'
import { AppStateProps, appReducer } from './app/app.reducer'

export interface RootStateProps {
    appModule: AppStateProps
    stayModule: StayStateProps
}

const rootReducer = combineReducers({
    appModule: appReducer,
    stayModule: stayReducer,
})

export const store = legacy_createStore(rootReducer)
