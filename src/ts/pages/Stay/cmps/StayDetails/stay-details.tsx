import { ReserveByProps } from '../../../../interfaces/reserve-by-interface'
import { StayProps, StayReservationProps } from '../../../../interfaces/stay-interface'
import { ReserveDates } from '../ReserveStay/cmps/reserve-dates'
import { StayAirCover } from './stay-air-cover'
import { StayAmenities } from './stay-amenities'
import { StayAttributes } from './stay-attributes'
import { StayDetailsHeader } from './stay-details-header'
import { StaySleepingArrangement } from './stay-sleeping-arrangement'
import { StaySummary } from './stay-summary'

interface Props {
    stay: StayProps
    stayReservations: StayReservationProps[]
    reserveBy: ReserveByProps
    onSetReserveBy: (updatedReservation: ReserveByProps) => void
    nightsCount: number
    onOpenModal: (expandedModal: string) => void
}

export function StayDetails({ stay, stayReservations, reserveBy, onSetReserveBy, nightsCount, onOpenModal }: Props) {
    const stayDetailsHeaderProps = {
        host: stay.host,
        details: stay.stayDetails,
        roomType: stay.roomType,
    }

    const reserveDatesProps = {
        stayReservations,
        reserveBy,
        onSetReserveBy,
        nightsCount,
    }

    return (
        <section className='stay-details'>
            <StayDetailsHeader {...stayDetailsHeaderProps} />
            <StayAttributes />
            <StayAirCover onOpenModal={onOpenModal} />
            <StaySummary summary={stay.summary} />
            <StaySleepingArrangement details={stay.stayDetails} />
            <StayAmenities amenities={stay.amenities} />
            <ReserveDates {...reserveDatesProps} />
        </section>
    )
}
