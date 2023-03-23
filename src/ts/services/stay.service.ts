import { storageService } from './async-storage.service'
import minifiedStays from '../data/minified-stays.json'
import categoryFilters from '../data/category-filters.json'
import { utilService } from './util.service'
import { StayProps, StayReviewProps } from '../interfaces/stay-interface'
const STORAGE_KEY: string = 'stay_DB'

_createStays()

export const stayService = {
    query,
    getCategoryFilters,
    getStayAverageRating,
    getDeafultSearchProps,
}

async function query() {
    return (await storageService.query(STORAGE_KEY)) as StayProps[]
}

function getCategoryFilters() {
    return categoryFilters
}

function getStayAverageRating(stay: StayProps) {
    return (
        stay.reviews.reduce((acc: number, review: StayReviewProps) => {
            const values: number[] = Object.values(review.moreRate)
            const avg = values.reduce((sum, value) => sum + value, 0) / values.length
            return acc + avg
        }, 0) / stay.reviews.length
    )
}

function getDeafultSearchProps() {
    return {
        destination: '',
        checkIn: new Date(),
        checkOut: new Date(),
        guests: {
            adults: 0,
            children: 0,
            infants: 0,
            pets: 0,
        },
    }
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
        stay.randomAvaliableDates = utilService.getRandomAvaliableDates()
        return stay
    })
    return stays
}
