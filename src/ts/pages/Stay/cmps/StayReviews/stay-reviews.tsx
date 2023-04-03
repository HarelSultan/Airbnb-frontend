import { AiFillStar } from 'react-icons/ai'
import { stayService } from '../../../../services/stay.service'
import { StayReviewProps } from '../../../../interfaces/stay-interface'
import { StayCategoryRating } from './cmps/stay-category-rating'
import { Stayreview } from './cmps/stay-review'

interface Props {
    reviews: StayReviewProps[]
}

export function StayReviews({ reviews }: Props) {
    const categoriesRating = [
        {
            category: 'Cleanliness',
            ratings: reviews.map(review => review.moreRate.cleanlliness),
        },
        {
            category: 'Communication',
            ratings: reviews.map(review => review.moreRate.communication),
        },
        {
            category: 'Check-in',
            ratings: reviews.map(review => review.moreRate.checkIn),
        },
        {
            category: 'Accuracy',
            ratings: reviews.map(review => review.moreRate.accuracy),
        },
        {
            category: 'Location',
            ratings: reviews.map(review => review.moreRate.location),
        },
        {
            category: 'Value',
            ratings: reviews.map(review => review.moreRate.value),
        },
    ]

    return (
        <section className='stay-reviews'>
            <div className='stay-rating flex align-center'>
                <AiFillStar />
                <h3>{stayService.getStayAverageRating(reviews).toFixed(1)} ·</h3>
                <h3 className='review-count'>{reviews.length} reviews</h3>
            </div>
            <div className='categories-rating-container'>
                {categoriesRating.map(categoryRating => (
                    <StayCategoryRating key={categoryRating.category} categoryRating={categoryRating} />
                ))}
            </div>
            <div className='reviews-container'>
                {reviews.map(review => (
                    <Stayreview key={review.id} review={review} />
                ))}
            </div>
        </section>
    )
}
