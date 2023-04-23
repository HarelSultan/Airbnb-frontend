import { FiHeart, FiShare } from 'react-icons/fi'
import { ImgCarousel } from '../../Home/cmps/img-carousel'
import { GrPrevious } from 'react-icons/gr'

interface Props {
    imgUrls: string[]
    onGoBack?: () => void
    onToggleSaveStay: (ev: React.MouseEvent<HTMLButtonElement>) => void
    isStaySaved: boolean
    onOpenGalleryModal?: (expandedModal: string) => void
}

export function StayImgCarousel({ imgUrls, onGoBack, onToggleSaveStay, isStaySaved, onOpenGalleryModal }: Props) {
    return (
        <section className='full stay-img-carousel'>
            {onGoBack && (
                <button onClick={onGoBack} className='btn btn-go-back'>
                    <GrPrevious />
                </button>
            )}
            <div className='action-btns-container'>
                <button className='btn btn-share underline'>
                    <FiShare />
                </button>
                <button
                    onClick={onToggleSaveStay}
                    className={`btn btn-wish-list underline ${isStaySaved ? 'saved' : ''}`}
                >
                    <FiHeart />
                </button>
            </div>
            <ImgCarousel imgUrls={imgUrls} onOpenGalleryModal={onOpenGalleryModal ? onOpenGalleryModal : undefined} />
        </section>
    )
}
