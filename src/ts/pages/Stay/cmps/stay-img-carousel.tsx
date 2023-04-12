import { FiHeart, FiShare } from 'react-icons/fi'
import { ImgCarousel } from '../../Home/cmps/img-carousel'
import { GrPrevious } from 'react-icons/gr'

interface Props {
    imgUrls: string[]
}

export function StayImgCarousel({ imgUrls }: Props) {
    return (
        <section className='full stay-img-carousel'>
            <button className='btn btn-go-back'>
                <GrPrevious />
            </button>
            <div className='action-btns-container'>
                <button className='btn btn-share underline'>
                    <FiShare />
                </button>
                <button className='btn btn-save underline'>
                    <FiHeart />
                </button>
            </div>
            <ImgCarousel imgUrls={imgUrls} />
        </section>
    )
}
