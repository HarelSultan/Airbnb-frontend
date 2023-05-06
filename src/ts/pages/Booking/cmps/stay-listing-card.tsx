import { DatesProps, StayProps } from '../../../interfaces/stay-interface'
import { AiFillStar } from 'react-icons/ai'
import { stayService } from '../../../services/stay.service'
import { utilService } from '../../../services/util.service'

interface Props {
    stay: StayProps
    reservationDates?: DatesProps
}

export function StayListingCard({ stay, reservationDates }: Props) {
    return (
        <section className='stay-listing-card'>
            <div className='stay-img-wrapper'>
                <img src={stay.imgUrls[0]} alt='' />
            </div>
            <div className='listing-details'>
                <p className='stay-type'>{stay.type}</p>
                <p className='stay-name'>{stay.name}</p>
                <div className='stay-rating'>
                    <AiFillStar />
                    <span className='avg-rating'>{stayService.getStayAverageRating(stay.reviews).toFixed(2)}</span>
                    <span className='reviews-count'>({stay.reviews.length})</span>
                </div>
                {reservationDates && <h3 className='dates'>{utilService.formatDateRange(reservationDates)}</h3>}
            </div>
        </section>
    )
}
