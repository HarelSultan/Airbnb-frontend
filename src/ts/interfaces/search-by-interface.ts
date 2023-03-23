export interface SearchByProps {
    destination: string
    checkIn: Date
    checkOut: Date
    guests: searchByGuestProps
}

export interface searchByGuestProps {
    adults: number
    children: number
    infants: number
    pets: number
}
