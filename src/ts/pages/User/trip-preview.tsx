import { ReservationProps } from '../../interfaces/user-interface'
import { utilService } from '../../services/util.service'

interface Props {
    trip: ReservationProps
}

export function TripPreview({ trip }: Props) {
    return (
        <section className='trip-preview'>
            <img src={trip.stayImgsUrl[0]} alt={trip.stayImgsUrl[1]} />
            <div className='stay-details-wrapper'>
                <h4 className='stay-address'>{trip.stayLocation}</h4>
                <p>Hosted by {utilService.getFirstName(trip.hostName)}</p>
                <p>{utilService.formatDateRange(trip.reservationDates)}</p>
            </div>
        </section>
    )
}
// img - address,hosted by {host}, reservationDates
