import { combineReducers, legacy_createStore } from 'redux'
import { stayReducer, StayStateProps } from './stay/stay.reducer'

export interface RootStateProps {
    stayModule: StayStateProps
}

const rootReducer = combineReducers({
    stayModule: stayReducer,
})

export const store = legacy_createStore(rootReducer)
