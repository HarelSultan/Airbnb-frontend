export interface SearchByProps {
    destination: string
    checkIn: Date | null
    checkOut: Date | null
    guests: GuestProps
}

export interface GuestProps {
    adults: number
    children: number
    infants: number
    pets: number
}

export interface SearchModule {
    [key: string]: React.ReactNode
}
