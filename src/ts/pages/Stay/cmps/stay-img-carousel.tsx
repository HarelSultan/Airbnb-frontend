import { FiHeart, FiShare } from 'react-icons/fi'
import { ImgCarousel } from '../../Home/cmps/img-carousel'
import { GrPrevious } from 'react-icons/gr'
import { StayProps } from '../../../interfaces/stay-interface'

interface Props {
    imgUrls: string[]
    onToggleSaveStay: (ev: React.MouseEvent<HTMLButtonElement>) => void
    isStaySaved: boolean
}

export function StayImgCarousel({ imgUrls, onToggleSaveStay, isStaySaved }: Props) {
    return (
        <section className='full stay-img-carousel'>
            <button className='btn btn-go-back'>
                <GrPrevious />
            </button>
            <div className='action-btns-container'>
                <button className='btn btn-share underline'>
                    <FiShare />
                </button>
                <button onClick={onToggleSaveStay} className={`btn btn-save underline ${isStaySaved ? 'saved' : ''}`}>
                    <FiHeart />
                </button>
            </div>
            <ImgCarousel imgUrls={imgUrls} />
        </section>
    )
}
