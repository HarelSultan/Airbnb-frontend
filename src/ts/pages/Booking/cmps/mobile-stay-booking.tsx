import { CtaBtn } from '../../../cmps/cta-btn'
import { ReserveByProps } from '../../../interfaces/reserve-by-interface'
import { StayProps } from '../../../interfaces/stay-interface'
import { PricingSummary } from '../../Stay/cmps/ReserveStay/cmps/pricing-summary'
import { StayAirCover } from '../../Stay/cmps/StayDetails/stay-air-cover'
import { StayListingCard } from './stay-listing-card'
import { TripDetails } from './trip-details'

interface Props {
    stay: StayProps
    reserveBy: ReserveByProps
    nightsCount: number
    onReservationComplete: () => void
}

export function MobileStayBooking({ stay, reserveBy, nightsCount, onReservationComplete }: Props) {
    return (
        <section className='mobile-stay-booking'>
            <StayListingCard stay={stay} />
            <StayAirCover />
            <TripDetails reserveBy={reserveBy} />
            <section className='price-details'>
                <h4>Price details</h4>
                <PricingSummary nightlyPrice={stay.price} nightsCount={nightsCount} />
            </section>
            <section className='login-signup'>
                <h4>Log in or sign up to book</h4>

                <CtaBtn onClickCB={onReservationComplete} txt={'Continue'} />
            </section>
        </section>
    )
}
