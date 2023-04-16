import { CtaBtn } from '../../../cmps/cta-btn'
import { LoginSignup } from '../../../cmps/login-signup'
import { ReserveByProps } from '../../../interfaces/reserve-by-interface'
import { StayProps } from '../../../interfaces/stay-interface'
import { PricingSummary } from '../../Stay/cmps/ReserveStay/cmps/pricing-summary'
import { StayListingCard } from './stay-listing-card'
import { TripDetails } from './trip-details'

interface Props {
    stay: StayProps
    reserveBy: ReserveByProps
    nightsCount: number
    onReservationComplete: () => void
}

export function DesktopStayBooking({ stay, reserveBy, nightsCount, onReservationComplete }: Props) {
    return (
        <section className='desktop-stay-booking'>
            <div className='booking-details'>
                <TripDetails reserveBy={reserveBy} />
                <LoginSignup isSignningUp={false} />
            </div>

            <div className='booking-stay-details'>
                <StayListingCard stay={stay} />
                <section className='air-cover'>
                    <p>Your booking is protected by</p>
                    <img
                        className='air-cover-img'
                        src='https://res.cloudinary.com/dotasvsuv/image/upload/v1680445107/f9axjhl7sxlnhy5owbbw.webp'
                        alt=''
                    />
                </section>
                <section className='price-details'>
                    <h4>Price details</h4>
                    <PricingSummary nightlyPrice={stay.price} nightsCount={nightsCount} />
                </section>
            </div>
        </section>
    )
}
