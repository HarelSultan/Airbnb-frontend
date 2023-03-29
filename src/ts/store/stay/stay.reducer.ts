import { FilterByProps } from '../../interfaces/filter-by-interface'
import { StayProps } from '../../interfaces/stay-interface'
import { stayService } from '../../services/stay.service'

export const SET_STAYS = 'SET_STAYS'
export const SET_FILTER = 'SET_FILTER'

export interface StayStateProps {
    stays: StayProps[]
    filterBy: FilterByProps
}

export type StayAction = { type: 'SET_STAYS'; stays: StayProps[] } | { type: 'SET_FILTER'; filterBy: FilterByProps }

const initialState: StayStateProps = {
    stays: [],
    filterBy: stayService.getDefaultFilterProps(),
}

export function stayReducer(state = initialState, action: StayAction) {
    switch (action.type) {
        case SET_STAYS:
            return { ...state, stays: action.stays }

        case SET_FILTER:
            return { ...state, filterBy: action.filterBy }

        default:
            console.log('Went to deafult at stayReducer')
            return state
    }
}
