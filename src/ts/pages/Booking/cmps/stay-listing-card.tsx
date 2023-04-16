import { StayProps } from '../../../interfaces/stay-interface'
import { AiFillStar } from 'react-icons/ai'
import { stayService } from '../../../services/stay.service'

interface Props {
    stay: StayProps
}

export function StayListingCard({ stay }: Props) {
    return (
        <section className='stay-listing-card'>
            <div className='stay-img-wrapper'>
                <img src={stay.imgUrls[0]} alt='' />
            </div>
            <div className='stay-details'>
                <p className='stay-type'>{stay.type}</p>
                <p className='stay-name'>{stay.name}</p>
                <div className='stay-rating'>
                    <AiFillStar />
                    {stayService.getStayAverageRating(stay.reviews).toFixed(2)}
                    <span className='reviews-count'>({stay.reviews.length})</span>
                </div>
            </div>
        </section>
    )
}
