import { AiFillStar } from 'react-icons/ai'
import { DatesProps, StayReviewProps } from '../../../interfaces/stay-interface'
import { stayService } from '../../../services/stay.service'
import { SearchByProps } from '../../../interfaces/search-by-interface'
import { SearchDates } from '../../../cmps/AppHeader/cmps/search-dates'

interface Props {
    price: number
    reviews: StayReviewProps[]
    takenDates: DatesProps[]
}

// Search by ?
export function ReserveStay({ price, reviews, takenDates }: Props) {
    return (
        <section className='reserve-stay'>
            <h3 className='price'>${price} night</h3>
            <div className='stay-rating flex align-center'>
                <AiFillStar />
                <span>{stayService.getStayAverageRating(reviews).toFixed(1)} ·</span>
                <span className='review-count underline'> {reviews.length} reviews</span>
            </div>
        </section>
    )
}
