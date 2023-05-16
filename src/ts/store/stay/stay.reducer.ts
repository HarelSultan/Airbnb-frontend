import { FilterByProps } from '../../interfaces/filter-by-interface'
import { StayProps } from '../../interfaces/stay-interface'
import { stayService } from '../../services/stay.service'

export const SET_STAYS = 'SET_STAYS'
export const SET_MORE_STAYS = 'SET_MORE_STAYS'
export const SET_FILTER = 'SET_FILTER'
export const ADD_STAY = 'ADD_STAY'
export const UPDATE_STAY = 'UPDATE_STAY'

export interface StayStateProps {
    stays: StayProps[]
    filterBy: FilterByProps
    totalPageCount: number | null
}

export type StayAction =
    | { type: 'SET_STAYS'; stays: StayProps[] }
    | { type: 'SET_MORE_STAYS'; stays: StayProps[] }
    | { type: 'SET_FILTER'; filterBy: FilterByProps }
    | { type: 'ADD_STAY'; stay: StayProps }
    | { type: 'UPDATE_STAY'; stay: StayProps }

const initialState: StayStateProps = {
    stays: [],
    totalPageCount: null,
    filterBy: stayService.getDefaultFilterProps(),
}

export function stayReducer(state = initialState, action: StayAction) {
    switch (action.type) {
        case SET_STAYS:
            return { ...state, stays: action.stays }

        case SET_MORE_STAYS:
            const newStays = [...state.stays, ...action.stays]
            console.log(newStays)
            return { ...state, stays: newStays }

        case SET_FILTER:
            console.log('FILTER:', action)
            return { ...state, filterBy: action.filterBy }

        case ADD_STAY:
            return { ...state, stays: [...state.stays, action.stay] }

        case UPDATE_STAY:
            const updatedStays = state.stays.map(stay => (stay._id === action.stay._id ? action.stay : stay))
            return { ...state, stays: updatedStays }

        default:
            console.log('Went to deafult at stayReducer')
            return state
    }
}
