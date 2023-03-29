import { FilterByProps } from '../../interfaces/filter-by-interface'
import { stayService } from '../../services/stay.service'
import { store } from '../store'
import { SET_FILTER, SET_STAYS, StayAction } from './stay.reducer'

export async function loadStays(filterBy: FilterByProps) {
    try {
        const stays = await stayService.query(filterBy)
        store.dispatch<StayAction>({ type: SET_STAYS, stays })
    } catch (err) {
        console.log('Failed loading stays with error', err)
        throw err
    }
}

export function setFilter(filterBy: FilterByProps) {
    store.dispatch<StayAction>({ type: SET_FILTER, filterBy })
}
