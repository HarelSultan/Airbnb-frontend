import { GuestProps } from './search-by-interface'
import { DatesProps, StayHostProps, StayProps } from './stay-interface'

export interface UserProps {
    _id: string
    username: string
    password: string
    fullName: string
    wishListStaysId: string[]
    wishListStays?: StayProps[]
    listingsId: string[]
    imgUrl: string
    listings?: StayProps[]
    trips: ReservationProps[]
    tripsStays?: StayProps[]
    listingReservations?: ReservationProps[]
}

export interface UserLoginProps {
    username: string
    password: string
}

export interface ReservationProps {
    _id: string
    stayId: string
    stayName: string
    stayLocation: {
        city: string
        lat: number
        lng: number
    }
    stayImgsUrl: string[]
    host: StayHostProps
    guestId: string
    guestName: string
    reservationDates: DatesProps
    bookedAt: Date
    totalPayout: number
    guests: GuestProps
    status: string
}

export interface DashboardDataProps {
    [key: string]: ReservationCountMap
}

export interface ReservationCountMap {
    [key: string]: number
}
// WishList
