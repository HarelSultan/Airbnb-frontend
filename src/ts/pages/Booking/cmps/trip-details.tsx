import { ReserveByProps } from '../../../interfaces/reserve-by-interface'
import { utilService } from '../../../services/util.service'

interface Props {
    reserveBy: ReserveByProps
}

export function TripDetails({ reserveBy }: Props) {
    return (
        <section className='trip-details'>
            <h4>Your trip</h4>
            <div className='trip-dates'>
                <h5>Dates</h5>
                <p>{utilService.formatDateRange({ checkIn: reserveBy.checkIn, checkOut: reserveBy.checkOut })}</p>
                <button className='btn btn-edit underline'>Edit</button>
            </div>
            <div className='trip-check-in-time'>
                <h5>Check-in time</h5>
                <p>8:00 PM - 10:00 PM</p>
                <button className='btn btn-edit underline'>Edit</button>
            </div>
            <div className='trip-guests'>
                <h5>Guests</h5>
                <p>{utilService.formatGuestCount(reserveBy.guests)}</p>
                <button className='btn btn-edit underline'>Edit</button>
            </div>
        </section>
    )
}
