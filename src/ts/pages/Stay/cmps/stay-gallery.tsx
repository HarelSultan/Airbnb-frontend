import { IMG_CAROUSEL_MODAL } from '../stay-page'

interface Props {
    imgUrls: string[]
    onOpenGalleryModal: (expandedModal: string) => void
}

export function StayGallery({ imgUrls, onOpenGalleryModal }: Props) {
    return (
        <section className='stay-gallery'>
            {imgUrls.map(url => (
                <div onClick={() => onOpenGalleryModal(IMG_CAROUSEL_MODAL)} key={url} className='img-wrapper'>
                    <img src={url} />
                </div>
            ))}
        </section>
    )
}
