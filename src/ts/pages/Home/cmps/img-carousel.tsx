import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import { GrFormNext, GrFormPrevious } from 'react-icons/gr'

interface Props {
    imgUrls: string[]
}

export function ImgCarousel({ imgUrls }: Props) {
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
            renderIndicator={(onClickHandler, isSelected, index) => {
                return (
                    <span onClick={e => e.stopPropagation()}>
                        <li
                            className={`dot ${isSelected && 'dot selected'}`}
                            onClick={onClickHandler}
                            key={`carousel-${index}`}
                        />
                    </span>
                )
            }}
        >
            {imgUrls.map(url => (
                <div key={url} className='stay-img-wrapper'>
                    <img src={url} alt='' />
                </div>
            ))}
        </Carousel>
    )
}
