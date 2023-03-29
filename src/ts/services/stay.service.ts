import { storageService } from './async-storage.service'
import minifiedStays from '../data/minified-stays.json'
import labelFilters from '../data/label-filters.json'
import { utilService } from './util.service'
import { StayProps, StayReviewProps } from '../interfaces/stay-interface'
import { FilterByProps } from '../interfaces/filter-by-interface'
const STORAGE_KEY: string = 'stay_DB'

_createStays()

export const stayService = {
    query,
    getLabelFilters,
    getStayAverageRating,
    getDeafultSearchProps,
    getDefaultFilterProps,
}

async function query(filterBy: FilterByProps = getDefaultFilterProps()) {
    let filteredStays = (await storageService.query(STORAGE_KEY)) as StayProps[]

    if (filterBy.label) {
        filteredStays = filteredStays.filter(stay => stay.labels.includes(filterBy.label))
    }

    if (filterBy.minPrice > 0) {
        filteredStays = filteredStays.filter(stay => stay.price > filterBy.minPrice)
    }

    if (filterBy.maxPrice > 0) {
        filteredStays = filteredStays.filter(stay => stay.price < filterBy.maxPrice)
    }

    if (filterBy.type.length) {
        filteredStays = filteredStays.filter(stay => filterBy.type.includes(stay.type))
    }
    return filteredStays
}

function getLabelFilters() {
    return labelFilters
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
        checkIn: null,
        checkOut: null,
        guests: {
            adults: 0,
            children: 0,
            infants: 0,
            pets: 0,
        },
    }
}

function getDefaultFilterProps() {
    return {
        label: 'OMG!',
        minPrice: 0,
        maxPrice: 0,
        type: [],
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
    stays = stays.map((stay: StayProps) => {
        stay._id = utilService.makeId()
        stay.randomAvaliableDates = utilService.getRandomAvaliableDates()
        return stay
    })
    return stays
}
