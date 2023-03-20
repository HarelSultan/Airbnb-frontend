import { storageService } from './async-storage.service'
import minifiedStays from '../data/minified-stays.json'
import { utilService } from './util.service'
const STORAGE_KEY: string = 'stay_DB'

_createStays()

export const stayService = {
    query,
}

async function query() {
    return await storageService.query(STORAGE_KEY)
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
    stays = stays.map((stay: any) => (stay._id = utilService.makeId()))
    return stays
}
