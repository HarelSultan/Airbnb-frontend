import { httpService } from './http.service'
import { userService } from './user.service'
import labelFilters from '../data/label-filters.json'

import { StayProps, StayReviewProps } from '../interfaces/stay-interface'
import { FilterByProps } from '../interfaces/filter-by-interface'
import { SearchByProps } from '../interfaces/search-by-interface'
import { DashboardDataProps, ReservationCountMap, ReservationProps } from '../interfaces/user-interface'
import { ReserveByProps } from '../interfaces/reserve-by-interface'

export const stayService = {
    loadStays,
    getById,
    save,
    getUserStays,
    getParamsSearchBy,
    getLabelFilters,
    getAmenities,
    getStayAverageRating,
    getCategoryAverageRating,
    getReserveByProps,
    getHostDashboardData,
    getEmptyStayProps,
    getDeafultSearchProps,
    getDefaultFilterProps,
}

const ALL_HOMES: string = 'All homes'
const BASE_URL: string = 'stay'

async function loadStays(
    pageIdx: number = 0,
    searchBy: SearchByProps = getDeafultSearchProps(),
    filterBy: FilterByProps = getDefaultFilterProps()
) {
    return httpService.get(BASE_URL, { pageIdx, filterBy, searchBy })
}

async function getById(stayId: string) {
    return httpService.get(BASE_URL + `/${stayId}`)
}

async function save(stay: StayProps) {
    let savedStay
    if (stay._id) {
        savedStay = await httpService.put(BASE_URL + `/${stay._id}`, stay)
    } else {
        savedStay = await httpService.post(BASE_URL, stay)
    }
    return savedStay
}

async function getUserStays(staysId: string[]) {
    return await httpService.get(BASE_URL + '/user', {
        staysId,
    })
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
