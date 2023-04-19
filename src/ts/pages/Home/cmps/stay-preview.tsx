import { StayProps } from '../../../interfaces/stay-interface'
import { stayService } from '../../../services/stay.service'
import { utilService } from '../../../services/util.service'
import { ImgCarousel } from './img-carousel'

interface Props {
    stay: StayProps
    onStayDetails: (stay: StayProps) => void
    onSaveStay: (ev: React.MouseEvent<HTMLButtonElement>, stay: StayProps) => void
    wishList: string[]
}

export function StayPreview({ stay, onStayDetails, onSaveStay, wishList }: Props) {
    return (
        <article className='stay-preview' onClick={() => onStayDetails(stay)}>
            <ImgCarousel imgUrls={stay.imgUrls} />
            <button
                onClick={ev => onSaveStay(ev, stay)}
                className={`btn btn-save ${wishList.includes(stay._id) ? 'saved' : ''}`}
            >
                <svg
                    viewBox='0 0 32 32'
                    xmlns='http://www.w3.org/2000/svg'
                    aria-hidden='true'
                    role='presentation'
                    focusable='false'
                >
                    <path d='m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z'></path>
                </svg>
            </button>
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
                    <span>{stayService.getStayAverageRating(stay.reviews).toFixed(2)}</span>
                </div>
                <span className='stay-type'>{stay.type}</span>
                <div className='wrapper'>
                    <span className='avaliable-dates'>{utilService.formatDateRange(stay.randomAvaliableDates)}</span>
                    <p className='stay-price'>
                        ${stay.price}
                        <span>night</span>
                    </p>
                </div>
            </div>
        </article>
    )
}
