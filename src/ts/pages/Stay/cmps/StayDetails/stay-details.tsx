import { ReserveByProps } from '../../../../interfaces/reserve-by-interface'
import { DatesProps, StayProps } from '../../../../interfaces/stay-interface'
import { ReserveDates } from '../ReserveStay/cmps/reserve-dates'
import { StayAirCover } from './stay-air-cover'
import { StayAmenities } from './stay-amenities'
import { StayAttributes } from './stay-attributes'
import { StayDetailsHeader } from './stay-details-header'
import { StaySleepingArrangement } from './stay-sleeping-arrangement'
import { StaySummary } from './stay-summary'

interface Props {
    stay: StayProps
    takenDates: DatesProps[]
    reserveBy: ReserveByProps
    onSetReserveBy: (updatedReservation: ReserveByProps) => void
    nightsCount: number
}

export function StayDetails({ stay, takenDates, reserveBy, onSetReserveBy, nightsCount }: Props) {
    const stayDetailsHeaderProps = {
        host: stay.host,
        details: stay.stayDetails,
        roomType: stay.roomType,
    }

    const reserveDatesProps = {
        takenDates,
        reserveBy,
        onSetReserveBy,
        nightsCount,
    }

    return (
        <section className='stay-details'>
            <StayDetailsHeader {...stayDetailsHeaderProps} />
            <StayAttributes />
            <StayAirCover />
            <StaySummary summary={stay.summary} />
            <StaySleepingArrangement details={stay.stayDetails} />
            <StayAmenities amenities={stay.amenities} />
            <ReserveDates {...reserveDatesProps} />
        </section>
    )
}
