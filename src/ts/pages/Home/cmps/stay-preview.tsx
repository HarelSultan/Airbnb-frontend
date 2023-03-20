import { StayProps } from '../../../interfaces/stay-interface'
import { FaStar } from 'react-icons/fa'
import { ImgCarousel } from './img-carousel'

interface Props {
    stay: StayProps
    onStayDetails: (stayId: string) => void
}

export function StayPreview({ stay, onStayDetails }: Props) {
    return (
        <article className='stay-preview' onClick={() => onStayDetails(stay._id)}>
            {/* <div className='stay-img-wrapper'>
                <img src={stay.imgUrls[0]} />
            </div> */}
            <ImgCarousel imgUrls={stay.imgUrls} />
            <div className='stay-details-wrapper'>
                <h3 className='stay-location'>{stay.loc.address}</h3>
                <div className='stay-rating'>
                    <svg
                        viewBox='0 0 32 32'
                        xmlns='http://www.w3.org/2000/svg'
                        aria-hidden='true'
                        role='presentation'
                        focusable='false'
                    >
                        <path
                            d='M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z'
                            fillRule='evenodd'
                        ></path>
                    </svg>
                    <span>4.45</span>
                </div>
                <span className='stay-type'>{stay.type}</span>
                <span className='avaliable-dates'>Mar 20 - 27</span>
                <p className='stay-price'>
                    ${stay.price}
                    <span>night</span>
                </p>
            </div>
        </article>
    )
}
