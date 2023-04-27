import { StayProps } from '../../../interfaces/stay-interface'
import { AiFillStar } from 'react-icons/ai'
import { stayService } from '../../../services/stay.service'

interface Props {
    stay: StayProps
    isPriceDisplayed?: boolean
}

export function StayListingCard({ stay, isPriceDisplayed }: Props) {
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
                {isPriceDisplayed && <h3 className='listing-price'>${stay.price}</h3>}
            </div>
        </section>
    )
}
