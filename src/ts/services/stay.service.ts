import { storageService } from './async-storage.service'
import minifiedStays from '../data/minified-stays.json'
import categoryFilters from '../data/category-filters.json'
import { utilService } from './util.service'
import { StayProps } from '../interfaces/stay-interface'
const STORAGE_KEY: string = 'stay_DB'

_createStays()

export const stayService = {
    query,
    getCategoryFilters,
}

async function query() {
    return (await storageService.query(STORAGE_KEY)) as StayProps[]
}

function getCategoryFilters() {
    return categoryFilters
}

function _createStays() {
    let stays = utilService.loadFromStorage(STORAGE_KEY)
    if (!stays || !stays.length) {
        stays = _makeStays()
        utilService.saveToStorage(STORAGE_KEY, stays)
    }
}

function _makeStays() {
    let stays: any = minifiedStays
    stays.sort(() => (Math.random() > 0.5 ? 1 : -1))
    stays = stays.map((stay: any) => {
        stay._id = utilService.makeId()
        return stay
    })
    return stays
}
