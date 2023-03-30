import { StayProps } from '../../../interfaces/stay-interface'
import { stayService } from '../../../services/stay.service'
import { FiShare } from 'react-icons/fi'
import { FaMedal } from 'react-icons/fa'
import { BsHeart } from 'react-icons/bs'
import { AiFillStar } from 'react-icons/ai'

interface Props {
    stay: StayProps
}

export function StayHeader({ stay }: Props) {
    return (
        <section className='stay-header'>
            <h2 className='stay-title'>{stay.name}</h2>
            <div className='stay-teaser'>
                <div className='stay-info flex align-center'>
                    <div className='stay-rating flex align-center'>
                        <AiFillStar />
                        <span>{stayService.getStayAverageRating(stay).toFixed(1)}</span>
                        <span className='dot-seperator'>·</span>
                    </div>
                    <span className='review-count underline'> {stay.reviews.length} reviews</span>
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
                <div className='action-btns-container'>
                    <button className='btn btn-share underline'>
                        <FiShare />
                        Share
                    </button>
                    <button className='btn btn-save underline'>
                        <BsHeart />
                        Save
                    </button>
                </div>
            </div>
        </section>
    )
}
