import { StayProps } from '../../../interfaces/stay-interface'
import { stayService } from '../../../services/stay.service'
import { FiShare, FiHeart } from 'react-icons/fi'
import { FaMedal } from 'react-icons/fa'
import { BsHeart } from 'react-icons/bs'
import { AiFillStar } from 'react-icons/ai'
import { REVIEWS_MODAL } from '../stay-page'

interface Props {
    stay: StayProps
    isMobile: boolean
    onToggleSaveStay: (ev: React.MouseEvent<HTMLButtonElement>) => void
    isStaySaved: boolean
    onOpenReviewsModal: (expandedModal: string) => void
}

export function StayHeader({ stay, isMobile, onToggleSaveStay, isStaySaved, onOpenReviewsModal }: Props) {
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
                    <span onClick={() => onOpenReviewsModal(REVIEWS_MODAL)} className='review-count underline'>
                        {' '}
                        {stay.reviews.length} reviews
                    </span>
                    <span className='dot-seperator'>·</span>

                    {stay.host.isSuperHost && (
                        <div className='super-host flex align-center'>
                            <FaMedal />
                            Superhost
                            <span className='dot-seperator'>·</span>
                        </div>
                    )}
                    <span className='location underline'>{stay.loc.address}</span>
                </div>
                {!isMobile && (
                    <div className='action-btns-container'>
                        <button className='btn btn-share underline'>
                            <FiShare />
                            Share
                        </button>
                        <button
                            onClick={onToggleSaveStay}
                            className={`btn btn-save underline ${isStaySaved ? 'saved' : ''}`}
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
