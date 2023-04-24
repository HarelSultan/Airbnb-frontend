import { FilterByProps } from '../../interfaces/filter-by-interface'
import { SearchByProps } from '../../interfaces/search-by-interface'
import { StayProps } from '../../interfaces/stay-interface'
import { stayService } from '../../services/stay.service'
import { store } from '../store'
import { ADD_STAY, SET_FILTER, SET_STAYS, StayAction, UPDATE_STAY } from './stay.reducer'

export async function loadStays(searchBy: SearchByProps, filterBy: FilterByProps) {
    try {
        const stays = await stayService.query(searchBy, filterBy)
        store.dispatch<StayAction>({ type: SET_STAYS, stays })
    } catch (err) {
        console.log('Failed loading stays with error', err)
        throw err
    }
}

export function setFilter(filterBy: FilterByProps) {
    store.dispatch<StayAction>({ type: SET_FILTER, filterBy })
}

export async function saveStay(stay: StayProps) {
    try {
        const type = stay._id ? UPDATE_STAY : ADD_STAY
        store.dispatch<StayAction>({ type, stay })
        const savedStay = await stayService.save(stay)
        return savedStay
    } catch (err) {
        console.log('Failed to save stay with error :', err)
        throw err
    }
}
