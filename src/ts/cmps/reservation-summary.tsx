import { ReserveByProps } from '../interfaces/reserve-by-interface'
import { StayProps } from '../interfaces/stay-interface'
import { StayListingCard } from '../pages/Booking/cmps/stay-listing-card'
import { utilService } from '../services/util.service'

interface Props {
    stay: StayProps
    reserveBy: ReserveByProps
    nightsCount: number
}

export function ReservationSummary({ stay, reserveBy, nightsCount }: Props) {
    return (
        <section className='reservation-summary'>
            <h4>Your trip</h4>
            <div className='trip-wrapper'>
                <div className='check-in-wrapper'>
                    <h5>Check-in</h5>
                    <p>
                        {reserveBy.checkIn.toLocaleDateString('en-US', {
                            month: 'numeric',
                            day: 'numeric',
                            year: 'numeric',
                        })}
                    </p>
                </div>
                <div className='check-out-wrapper'>
                    <h5>Check-Out</h5>
                    <p>
                        {reserveBy.checkOut.toLocaleDateString('en-US', {
                            month: 'numeric',
                            day: 'numeric',
                            year: 'numeric',
                        })}
                    </p>
                </div>
                <div className='host-wrapper'>
                    <h5>Host name</h5>
                    <p>{stay.host.fullname}</p>
                </div>
            </div>
            <h4>Stay details</h4>
            <StayListingCard stay={stay} />
            <h4>Price details</h4>
            <div className='pricing-wrapper'>
                <div className='guests-wrapper'>
                    <h5>Guests</h5>
                    <p>{utilService.formatGuestCount(reserveBy.guests)}</p>
                </div>
                <div className='nights-wrapper'>
                    <h5>Total nights</h5>
                    <p>{nightsCount}</p>
                </div>
                <div className='price-wrapper'>
                    <h5>Total Price</h5>
                    <p>{stay.price * nightsCount}</p>
                </div>
            </div>
        </section>
    )
}
