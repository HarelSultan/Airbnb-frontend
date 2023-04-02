export interface StayProps {
    _id: string
    name: string
    type: string
    imgUrls: string[]
    price: number
    summary: string
    amenities: string[]
    roomType: string
    randomAvaliableDates: DatesProps
    takenDates: DatesProps[]
    host: StayHostProps
    loc: {
        country: string
        countryCode: string
        city: string
        address: string
        destination: string
        lat: number
        lng: number
    }
    reviews: StayReviewProps[]
    likedByUsers: string[]
    labels: string[]
    stayDetails: StayDetailsProps
}

export interface StayHostProps {
    _id: string
    fullname: string
    imgUrl: string
    isSuperHost: boolean
}

export interface StayDetailsProps {
    guests: number
    bedrooms: number
    beds: number
    bathrooms: number
}

export interface StayReviewProps {
    createdAt: string
    by: {
        _id: string
        fullname: string
        imgUrl: string
        id: string
    }
    txt: string
    id: string
    moreRate: {
        cleanlliness: number
        accuracy: number
        communication: number
        location: number
        checkIn: number
        value: number
    }
}

export interface DatesProps {
    checkIn: Date
    checkOut: Date
}
