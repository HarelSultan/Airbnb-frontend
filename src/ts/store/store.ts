import { combineReducers, legacy_createStore } from 'redux'
import { stayReducer, StayStateProps } from './stay/stay.reducer'
import { AppStateProps, appReducer } from './app/app.reducer'
import { userReducer } from './user/user.reducer'

export interface RootStateProps {
    appModule: AppStateProps
    stayModule: StayStateProps
}

const rootReducer = combineReducers({
    appModule: appReducer,
    stayModule: stayReducer,
    userModule: userReducer,
})

export const store = legacy_createStore(rootReducer)
