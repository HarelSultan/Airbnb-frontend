import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import { CSSProperties } from 'react'
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
                    <button type='button' onClick={onClickHandler} title={label} style={{ left: 15 }}>
                        <GrFormPrevious />
                    </button>
                )
            }
            renderArrowNext={(onClickHandler, hasNext, label) =>
                hasNext && (
                    <button type='button' onClick={onClickHandler} title={label} style={{ right: 15 }}>
                        <GrFormNext />
                    </button>
                )
            }
        >
            {imgUrls.map(url => (
                <div key={url} className='stay-img-wrapper'>
                    <img src={url} alt='' />
                </div>
            ))}
        </Carousel>
    )
    // return (
    //     <Carousel {...carouselSettings}>
    //         {imgUrls.map(url => (
    //             <div className='stay-img-wrapper'>
    //                 <img src={url} alt='' />
    //             </div>
    //         ))}
    //     </Carousel>
    // )
}
