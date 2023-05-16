import { FilterByProps } from '../../interfaces/filter-by-interface'
import { SearchByProps } from '../../interfaces/search-by-interface'
import { StayProps } from '../../interfaces/stay-interface'
import { stayService } from '../../services/stay.service'
import { setIsLoading } from '../app/app.action'
import { store } from '../store'
import { ADD_STAY, SET_FILTER, SET_MORE_STAYS, SET_STAYS, StayAction, UPDATE_STAY } from './stay.reducer'

export async function loadStays(idx: number, searchBy: SearchByProps, filterBy: FilterByProps) {
    try {
        setIsLoading(true)
        const staysData = await stayService.loadStays(idx, searchBy, filterBy)
        store.dispatch<StayAction>({ type: SET_STAYS, stays: staysData.stays })
        console.log(staysData)
        return staysData.pageCount
    } catch (err) {
        console.log('Failed loading stays with error', err)
        throw err
    } finally {
        setIsLoading(false)
    }
}

export async function loadMoreStays(idx: number, searchBy: SearchByProps, filterBy: FilterByProps) {
    try {
        setIsLoading(true)
        const staysData = await stayService.loadStays(idx, searchBy, filterBy)
        store.dispatch<StayAction>({ type: SET_MORE_STAYS, stays: staysData.stays })
        return staysData.pageCount
    } catch (err) {
        console.log('Failed loading stays with error', err)
        throw err
    } finally {
        setIsLoading(false)
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
