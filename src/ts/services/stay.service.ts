import { storageService } from './async-storage.service'
import minifiedStays from '../data/minified-stays.json'
import labelFilters from '../data/label-filters.json'
import { utilService } from './util.service'
import { DatesProps, StayProps, StayReviewProps } from '../interfaces/stay-interface'
import { FilterByProps } from '../interfaces/filter-by-interface'
import { SearchByProps } from '../interfaces/search-by-interface'
const STORAGE_KEY: string = 'stay_DB'

_createStays()

export const stayService = {
    query,
    getLabelFilters,
    getStayAverageRating,
    getDeafultSearchProps,
    getDefaultFilterProps,
    getParamsSearchBy,
}

async function query(
    searchBy: SearchByProps = getDeafultSearchProps(),
    filterBy: FilterByProps = getDefaultFilterProps()
) {
    console.log(searchBy)
    console.log(filterBy)

    let stays = (await storageService.query(STORAGE_KEY)) as StayProps[]
    stays = searchStays(stays, searchBy)
    stays = filterStays(stays, filterBy)
    return stays
}

function searchStays(stays: StayProps[], searchBy: SearchByProps) {
    if (searchBy.destination) {
        stays = stays.filter(stay => stay.loc.destination === searchBy.destination)
    }

    if (searchBy.checkIn && searchBy.checkOut) {
        const { checkIn, checkOut } = searchBy
        stays = stays.filter(stay => utilService.isDateRangeTaken(stay.takenDates, { checkIn, checkOut }))
    }

    if (searchBy.guests.adults) {
        const { adults, children, infants, pets } = searchBy.guests
        const guestCount = adults + children + infants + pets
        stays = stays.filter(stay => stay.stayDetails.guests >= guestCount)
    }
    return stays
}

function filterStays(stays: StayProps[], filterBy: FilterByProps) {
    if (filterBy.label) {
        stays = stays.filter(stay => stay.labels.includes(filterBy.label))
    }

    if (filterBy.minPrice > 0) {
        stays = stays.filter(stay => stay.price >= filterBy.minPrice)
    }

    if (filterBy.maxPrice > 0) {
        stays = stays.filter(stay => stay.price <= filterBy.maxPrice)
    }

    if (filterBy.type.length) {
        stays = stays.filter(stay => filterBy.type.includes(stay.type))
    }
    return stays
}

function getParamsSearchBy(searchParams: URLSearchParams): SearchByProps {
    const params = Object.fromEntries(searchParams.entries())
    const searchBy = {
        destination: params.destination || '',
        checkIn: params.checkIn ? new Date(params.checkIn) : null,
        checkOut: params.checkOut ? new Date(params.checkOut) : null,
        guests: {
            adults: +params.adults || 0,
            children: +params.children || 0,
            infants: +params.infants || 0,
            pets: +params.pets || 0,
        },
    }
    return searchBy
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
        stay.takenDates = []
        while (stay.takenDates.length < 5) {
            stay.takenDates.push(utilService.getRandomDates(stay.takenDates))
        }
        stay.randomAvaliableDates = utilService.getRandomDates(stay.takenDates)
        return stay
    })
    return stays
}
