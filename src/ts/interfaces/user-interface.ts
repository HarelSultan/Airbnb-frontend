import { DatesProps, StayProps } from './stay-interface'

export interface UserProps {
    _id: string
    username: string
    password: string
    fullName: string
    stayWishList: string[]
    listingsId: string[]
    imgUrl: string
    listings?: StayProps[]
    trips: ReservationProps[]
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
    guestId: string
    guestName: string
    reservationDates: DatesProps
    bookedAt: Date
    totalPayout: number
    status: string
}

// WishList
