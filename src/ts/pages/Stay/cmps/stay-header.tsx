import { StayProps } from '../../../interfaces/stay-interface'
import { FiShare, FiHeart } from 'react-icons/fi'
import { FaMedal } from 'react-icons/fa'
import { AiFillStar } from 'react-icons/ai'
import { LOCATION_MODAL, REVIEWS_MODAL } from '../stay-page'
import { stayService } from '../../../services/stay.service'

interface Props {
    stay: StayProps
    isMobile: boolean
    onToggleSaveStay: (ev: React.MouseEvent<HTMLButtonElement>) => void
    isStaySaved: boolean
    onOpenReviewsModal: (expandedModal: string) => void
    onOpenLocationModal: (expandedModal: string) => void
    onShareStay: () => void
}

export function StayHeader({
    stay,
    isMobile,
    onToggleSaveStay,
    isStaySaved,
    onOpenReviewsModal,
    onOpenLocationModal,
    onShareStay,
}: Props) {
    return (
        <section className='stay-header'>
            <h2 className='stay-title'>{stay.name}</h2>
            <div className='stay-teaser'>
                <div className='stay-info flex align-center'>
                    <div className='stay-rating flex align-center'>
                        <AiFillStar />
                        <span>{stayService.getStayAverageRating(stay.reviews).toFixed(1)}</span>
                        <span className='dot-seperator'>·</span>
                    </div>
                    <button onClick={() => onOpenReviewsModal(REVIEWS_MODAL)} className='btn review-count underline'>
                        {' '}
                        {stay.reviews.length} reviews
                    </button>
                    <span className='dot-seperator'>·</span>

                    {stay.host.isSuperHost && (
                        <div className='super-host flex align-center'>
                            <FaMedal />
                            Superhost
                            <span className='dot-seperator'>·</span>
                        </div>
                    )}
                    <button onClick={() => onOpenLocationModal(LOCATION_MODAL)} className='btn location underline'>
                        {stay.loc.address}
                    </button>
                </div>
                {!isMobile && (
                    <div className='action-btns-container'>
                        <button onClick={onShareStay} className='btn btn-share underline'>
                            <FiShare />
                            Share
                        </button>
                        <button
                            onClick={onToggleSaveStay}
                            className={`btn btn-wish-list underline ${isStaySaved ? 'saved' : ''}`}
                        >
                            <FiHeart />
                            Save
                        </button>
                    </div>
                )}
            </div>
        </section>
    )
}
