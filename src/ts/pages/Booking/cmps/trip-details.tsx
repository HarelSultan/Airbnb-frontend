import { ReserveByProps } from '../../../interfaces/reserve-by-interface'
import { utilService } from '../../../services/util.service'
import { RESERVE_DATES_MODAL } from '../../Stay/stay-page'
import { RESERVE_GUESTS_MODAL } from '../booking-page'

interface Props {
    reserveBy: ReserveByProps
    onSetExpandedModal: (expandedModal: string) => void
}
export function TripDetails({ reserveBy, onSetExpandedModal }: Props) {
    return (
        <section className='trip-details'>
            <h4>Your trip</h4>
            <div className='trip-detail trip-dates'>
                <h5>Dates</h5>
                <p>{utilService.formatDateRange({ checkIn: reserveBy.checkIn, checkOut: reserveBy.checkOut })}</p>
                <button onClick={() => onSetExpandedModal(RESERVE_DATES_MODAL)} className='btn btn-edit underline'>
                    Edit
                </button>
            </div>

            <div className='trip-detail trip-guests'>
                <h5>Guests</h5>
                <p>{utilService.formatGuestCount(reserveBy.guests)}</p>
                <button onClick={() => onSetExpandedModal(RESERVE_GUESTS_MODAL)} className='btn btn-edit underline'>
                    Edit
                </button>
            </div>
        </section>
    )
}
