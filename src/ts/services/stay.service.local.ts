import { storageService } from './async-storage.service'
import minifiedStays from '../data/minified-stays.json'
import labelFilters from '../data/label-filters.json'
import { utilService } from './util.service'
import { StayProps, StayReviewProps } from '../interfaces/stay-interface'
import { userService } from './user.service'
import { FilterByProps } from '../interfaces/filter-by-interface'
import { SearchByProps } from '../interfaces/search-by-interface'
import { ReserveByProps } from '../interfaces/reserve-by-interface'
import { DashboardDataProps, ReservationCountMap, ReservationProps, UserProps } from '../interfaces/user-interface'

const STORAGE_KEY_STAY_DB: string = 'stay_DB'
const ALL_HOMES: string = 'All homes'
const STAYS_INCREMENT_COUNT = 20

_createStays()

export const stayService = {
    query,
    loadStays,
    getById,
    save,
    getStays,
    getLabelFilters,
    getAmenities,
    getStayAverageRating,
    getCategoryAverageRating,
    getDeafultSearchProps,
    getDefaultFilterProps,
    getParamsSearchBy,
    getReserveByProps,
    getEmptyStayProps,
    getHostDashboardData,
}

async function query() {
    return storageService.query(STORAGE_KEY_STAY_DB) as Promise<StayProps[]>
}

async function loadStays(
    idx: number = 0,
    searchBy: SearchByProps = getDeafultSearchProps(),
    filterBy: FilterByProps = getDefaultFilterProps()
) {
    let stays = (await storageService.query(STORAGE_KEY_STAY_DB)) as StayProps[]
    const pageCount = Math.ceil(stays.length / STAYS_INCREMENT_COUNT)
    console.log(pageCount)
    stays = searchStays(stays, searchBy)
    stays = filterStays(stays, filterBy)
    return {
        pageCount,
        stays: stays.slice(idx * STAYS_INCREMENT_COUNT, idx * STAYS_INCREMENT_COUNT + STAYS_INCREMENT_COUNT),
    }
}

async function getById(stayId: string) {
    return storageService.get(STORAGE_KEY_STAY_DB, stayId) as Promise<StayProps>
}

function save(stay: StayProps) {
    if (stay._id) {
        return storageService.put(STORAGE_KEY_STAY_DB, stay)
    } else {
        return storageService.post(STORAGE_KEY_STAY_DB, stay)
    }
}

function searchStays(stays: StayProps[], searchBy: SearchByProps) {
    if (searchBy.destination) {
        stays = stays.filter(stay => stay.loc.destination === searchBy.destination)
    }

    if (searchBy.checkIn && searchBy.checkOut) {
        const { checkIn, checkOut } = searchBy
        // stays = stays.filter(stay => !utilService.isDateRangeTaken(stay.takenDates, { checkIn, checkOut }))
        stays = stays.filter(stay => {
            const takenDates = stay.reservations.map(reservation => reservation.dates)
            return !utilService.isDateRangeTaken(takenDates, { checkIn, checkOut })
        })
    }

    if (searchBy.guests.adults) {
        const { adults, children, infants, pets } = searchBy.guests
        const guestCount = adults + children + infants + pets
        stays = stays.filter(stay => stay.stayDetails.guests >= guestCount)
    }
    return stays
}

function filterStays(stays: StayProps[], filterBy: FilterByProps) {
    if (filterBy.label && filterBy.label !== ALL_HOMES) {
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

async function getStays(staysId: string[]) {
    try {
        console.log(staysId)
        const stays = await query()
        return stays.filter(stay => staysId.includes(stay._id))
    } catch (err) {
        console.log('Failed to get host listings with error:', err)
        throw err
    }
}

function getParamsSearchBy(searchParams: URLSearchParams): SearchByProps {
    const params = Object.fromEntries(searchParams.entries())
    console.log('search params from stay service', searchParams)
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

function getAmenities() {
    return [
        'TV',
        'Internet',
        'Wifi',
        'Air conditioning',
        'Kitchen',
        'Pets allowed',
        'Elevator',
        'Buzzer/wireless intercom',
        'Family/kid friendly',
        'Washer',
        'Smoke detector',
        'Carbon monoxide detector',
        'Essentials',
        'Shampoo',
        'Lock on bedroom door',
        '24-hour check-in',
        'Hangers',
        'Hair dryer',
        'Iron',
        'Laptop friendly workspace',
        'Self check-in',
        'Keypad',
        'Window guards',
        'Room-darkening shades',
        'Hot water',
        'Luggage dropoff allowed',
        'Long term stays allowed',
        'Free parking on premises',
        'Breakfast',
        'Heating',
        'Suitable for events',
        'Dryer',
        'Safety card',
        'Private entrance',
        'Paid parking off premises',
        'Doorman',
        'Free street parking',
        'Bathtub',
        'Host greets you',
        'Wheelchair accessible',
        'Gym',
        'First aid kit',
        'Fire extinguisher',
        'Cable TV',
        'Building staff',
        'Other',
        'Lockbox',
        'Private living room',
        'Bed linens',
        'Microwave',
        'Coffee maker',
        'Refrigerator',
        'Dishwasher',
        'Dishes and silverware',
        'Cooking basics',
        'Oven',
        'Stove',
        'Smoking allowed',
        'Extra pillows and blankets',
        'Ethernet connection',
        'Single level home',
        'Patio or balcony',
        'Pool',
        'Pets live on this property',
        'Dog(s)',
        'Hot tub',
        'Body soap',
        'Bath towel',
        'Toilet paper',
        'Full kitchen',
        'Bedroom comforts',
        'Bathroom essentials',
        'Outlet covers',
        'Children’s books and toys',
        'Children’s dinnerware',
        'Game console',
        'High chair',
        'Crib',
        'Pack ’n Play/travel crib',
        'Step-free access',
        'Wide doorway',
        'Wide clearance to bed',
        'Wide entryway',
        'Mountain view',
        'Balcony',
        'Sound system',
        'Breakfast table',
        'Espresso machine',
        'Convection oven',
        'Standing valet',
        'En suite bathroom',
        'Paid parking on premises',
        'Disabled parking spot',
        'Beachfront',
        'Fixed grab bars for shower',
        'Cat(s)',
        'Other pet(s)',
        'BBQ grill',
        'Garden or backyard',
        'Beach essentials',
        'Smart TV',
        'DVD player',
        'Beach view',
        'Rain shower',
        'Terrace',
        'Double oven',
        'Murphy bed',
        'Baby bath',
        'Pool with pool hoist',
        'Wide hallway clearance',
        'Flat path to front door',
        'Well-lit path to entrance',
        'Waterfront',
        'Accessible-height bed',
        'Firm mattress',
        'Handheld shower head',
        'Fixed grab bars for toilet',
        'Accessible-height toilet',
        'Indoor fireplace',
        'Cleaning before checkout',
        'Ground floor access',
        'Smart lock',
        'Babysitter recommendations',
        'Stair gates',
        'Bathtub with bath chair',
    ]
}

function getStayAverageRating(reviews: StayReviewProps[]) {
    return (
        reviews.reduce((acc: number, review: StayReviewProps) => {
            const ratings: number[] = Object.values(review.moreRate)
            const avg = getCategoryAverageRating(ratings)
            return acc + avg
        }, 0) / reviews.length
    )
}

function getCategoryAverageRating(ratings: number[]) {
    return ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
}

function getReserveByProps(searchBy: SearchByProps): ReserveByProps {
    const reserveBy = JSON.parse(JSON.stringify(searchBy))
    delete reserveBy.destination
    return {
        checkIn: new Date(reserveBy.checkIn) || new Date(),
        checkOut: new Date(reserveBy.checkOut) || new Date(),
        guests: reserveBy.guests,
    }
}

function getHostDashboardData(reservations: ReservationProps[]) {
    const reservationsStatusCountMap: ReservationCountMap = {
        pending: 0,
        approved: 0,
        rejected: 0,
    }
    const dashboardData = reservations.reduce(
        (acc: DashboardDataProps, reservation) => {
            const reservationMonth = new Date(reservation.reservationDates.checkIn).toLocaleDateString('default', {
                month: 'short',
            })
            if (!acc.hostMonthlyRevenue[reservationMonth]) acc.hostMonthlyRevenue[reservationMonth] = 0
            acc.hostMonthlyRevenue[reservationMonth] =
                acc.hostMonthlyRevenue[reservationMonth] + reservation.totalPayout

            if (!acc.listingReservationsCountMap[reservation.stayId])
                acc.listingReservationsCountMap[reservation.stayId] = 0
            acc.listingReservationsCountMap[reservation.stayId]++

            acc.reservationsStatusCountMap[reservation.status]++
            return acc
        },
        {
            hostMonthlyRevenue: {} as ReservationCountMap,
            listingReservationsCountMap: {} as ReservationCountMap,
            reservationsStatusCountMap,
        }
    )
    return dashboardData
}

function getEmptyStayProps() {
    const loggedInUser = userService.getLoggedinUser()
    const emptyStay: StayProps = {
        _id: '',
        name: '',
        type: '',
        imgUrls: [],
        price: 0,
        summary: '',
        amenities: [],
        roomType: '',
        randomAvaliableDates: {
            checkIn: new Date(),
            checkOut: new Date(),
        },
        reservations: [],
        host: {
            _id: loggedInUser?._id || '',
            fullname: loggedInUser?.fullname || '',
            imgUrl: loggedInUser?.imgUrl || '',
            isSuperHost: true,
        },
        loc: {
            country: '',
            countryCode: '',
            city: '',
            address: '',
            destination: '',
            lat: 0,
            lng: 0,
        },
        reviews: [],
        likedByUsers: [],
        labels: [],
        stayDetails: {
            guests: 0,
            bedrooms: 0,
            beds: 0,
            bathrooms: 0,
        },
    }
    return emptyStay
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
        label: ALL_HOMES,
        minPrice: 0,
        maxPrice: 0,
        type: [],
    }
}

function _createStays() {
    let stays = utilService.loadFromStorage(STORAGE_KEY_STAY_DB)
    if (!stays || !stays.length) {
        stays = _makeStays()
        utilService.saveToStorage(STORAGE_KEY_STAY_DB, stays)
    }
}

function _makeStays() {
    let stays: any = minifiedStays
    stays.sort(() => (Math.random() > 0.5 ? 1 : -1))
    stays = stays.map((stay: StayProps) => {
        stay.reservations = []
        while (stay.reservations.length < 3) {
            const takenDates = stay.reservations.map(reservation => reservation.dates)
            stay.reservations.push({
                _id: utilService.makeId(),
                dates: utilService.getRandomDates(takenDates),
            })
        }
        stay.randomAvaliableDates = utilService.getRandomDates(stay.reservations.map(reservation => reservation.dates))
        return stay
    })
    return stays
}
