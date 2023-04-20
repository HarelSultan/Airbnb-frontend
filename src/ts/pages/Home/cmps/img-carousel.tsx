import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import { GrFormNext, GrFormPrevious } from 'react-icons/gr'
import { IMG_CAROUSEL_MODAL } from '../../Stay/stay-page'

interface Props {
    imgUrls: string[]
    onOpenGalleryModal?: (expandedModal: string) => void
}

export function ImgCarousel({ imgUrls, onOpenGalleryModal }: Props) {
    const carouselSettings = {
        showStatus: false,
        showThumbs: false,
    }

    return (
        <Carousel
            {...carouselSettings}
            statusFormatter={(current, total) => `Current slide: ${current} / Total: ${total}`}
            renderArrowPrev={(onClickHandler, hasPrev, label) =>
                hasPrev && (
                    <button
                        type='button'
                        onClick={ev => {
                            ev.stopPropagation()
                            onClickHandler()
                        }}
                        title={label}
                        style={{ left: 15 }}
                    >
                        <GrFormPrevious />
                    </button>
                )
            }
            renderArrowNext={(onClickHandler, hasNext, label) =>
                hasNext && (
                    <button
                        type='button'
                        onClick={ev => {
                            ev.stopPropagation()
                            onClickHandler()
                        }}
                        title={label}
                        style={{ right: 15 }}
                    >
                        <GrFormNext />
                    </button>
                )
            }
            renderIndicator={(onClickHandler, isSelected, index) => (
                <span onClick={e => e.stopPropagation()}>
                    <li
                        className={`dot ${isSelected && 'dot selected'}`}
                        onClick={onClickHandler}
                        key={`carousel-${index}`}
                    />
                </span>
            )}
        >
            {imgUrls.map(url => (
                <div
                    onClick={onOpenGalleryModal ? () => onOpenGalleryModal(IMG_CAROUSEL_MODAL) : undefined}
                    key={url}
                    className='stay-img-wrapper'
                >
                    <img src={url} alt='' />
                </div>
            ))}
        </Carousel>
    )
}
