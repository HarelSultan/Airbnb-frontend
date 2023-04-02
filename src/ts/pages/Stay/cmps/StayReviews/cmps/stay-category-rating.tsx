import { stayService } from '../../../../../services/stay.service'

interface Props {
    categoryRating: {
        category: string
        ratings: number[]
    }
}

export function StayCategoryRating({ categoryRating }: Props) {
    const avgCategoryRating = stayService.getCategoryAverageRating(categoryRating.ratings)

    return (
        <div className='stay-category-rating'>
            <span className='rating-category'>{categoryRating.category}</span>
            <div className='rating-bar'>
                <div className='bar'>
                    <div className='progress' style={{ width: `${avgCategoryRating * 20}%` }}></div>
                </div>
                <span className='avg-rating'>{avgCategoryRating.toFixed(1)}</span>
            </div>
        </div>
    )
}
