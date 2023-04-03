import { GuestProps } from './search-by-interface'

export interface ReserveByProps {
    checkIn: Date
    checkOut: Date
    guests: GuestProps
}

export interface ReserveModule {
    [key: string]: React.ReactNode
}
