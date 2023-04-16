import { CtaBtn } from '../../../cmps/cta-btn'
import { LoginSignup } from '../../../cmps/login-signup'
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
        <section className='main-layout secondary-layout full mobile-stay-booking'>
            <StayListingCard stay={stay} />
            <section className='air-cover'>
                <p>Your booking is protected by</p>
                <img
                    className='air-cover-img'
                    src='https://res.cloudinary.com/dotasvsuv/image/upload/v1680445107/f9axjhl7sxlnhy5owbbw.webp'
                    alt=''
                />
            </section>
            <div className='seperator full'></div>
            <TripDetails reserveBy={reserveBy} />
            <div className='seperator full'></div>

            <section className='price-details'>
                <h4>Price details</h4>
                <PricingSummary nightlyPrice={stay.price} nightsCount={nightsCount} />
            </section>
            <div className='seperator full'></div>
            <LoginSignup isSignningUp={false} />
        </section>
    )
}
