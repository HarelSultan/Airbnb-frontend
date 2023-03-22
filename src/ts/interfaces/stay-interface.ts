export interface StayProps {
    _id: string
    name: string
    type: string
    imgUrls: string[]
    price: number
    summary: string
    amenities: string[]
    roomType: string
    randomAvaliableDates: AvaliableDatesProps
    host: {
        _id: string
        fullname: string
        imgUrl: string
        isSuperHost: boolean
    }
    loc: {
        country: string
        countryCode: string
        city: string
        address: string
        lat: number
        lng: number
    }
    reviews: StayReviewProps[]
    likedByUsers: string[]
    labels: string[]
    stayDetails: {
        guests: number
        bedrooms: number
        beds: number
        bathrooms: number
    }
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
        cleanliness: number
        accuracy: number
        communication: number
        location: number
        checkIn: number
        value: number
    }
}

export interface AvaliableDatesProps {
    checkInDate: Date
    checkOutDate: Date
}
