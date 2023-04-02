import { StayReviewProps } from '../../../../../interfaces/stay-interface'
import { utilService } from '../../../../../services/util.service'

interface Props {
    review: StayReviewProps
}

export function Stayreview({ review }: Props) {
    const formatReviewDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleString('default', { month: 'long', year: 'numeric' })
    }

    return (
        <div className='stay-review'>
            <div className='review-header'>
                <img src={review.by.imgUrl} alt='' />
                <div className='review-creator'>
                    <h4>{utilService.getFirstName(review.by.fullname)}</h4>
                    <span>{formatReviewDate(review.createdAt)}</span>
                </div>
            </div>
            <div className='review-desc-wrapper'>
                <p className='review-desc'>{review.txt}</p>
            </div>
        </div>
    )
}
