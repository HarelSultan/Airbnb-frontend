import { LoginSignup } from '../../../cmps/login-signup'
import { ReserveByProps } from '../../../interfaces/reserve-by-interface'
import { StayProps } from '../../../interfaces/stay-interface'
import { UserProps } from '../../../interfaces/user-interface'
import { PricingSummary } from '../../Stay/cmps/ReserveStay/cmps/pricing-summary'
import { ConfirmBooking } from './confirm-booking'
import { StayListingCard } from './stay-listing-card'
import { TripDetails } from './trip-details'

interface Props {
    stay: StayProps
    reserveBy: ReserveByProps
    nightsCount: number
    onCompleteReservation: () => void
    loggedInUser: UserProps | null
    onSetExpandedModal: (expandedModal: string) => void
}

export function MobileStayBooking({
    stay,
    reserveBy,
    nightsCount,
    onCompleteReservation,
    loggedInUser,
    onSetExpandedModal,
}: Props) {
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
            <TripDetails reserveBy={reserveBy} onSetExpandedModal={onSetExpandedModal} />
            <div className='seperator full'></div>

            <section className='price-details'>
                <h4>Price details</h4>
                <PricingSummary
                    nightlyPrice={stay.price}
                    nightsCount={nightsCount}
                    onOpenPriceModal={onSetExpandedModal}
                />
            </section>
            <div className='seperator full'></div>
            {loggedInUser ? (
                <ConfirmBooking
                    isMobile={true}
                    loggedInUser={loggedInUser}
                    checkIn={reserveBy.checkIn}
                    onCompleteReservation={onCompleteReservation}
                />
            ) : (
                <LoginSignup isSignningUp={false} />
            )}
        </section>
    )
}
