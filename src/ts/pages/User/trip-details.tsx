import { useSelector } from 'react-redux'
import { AppLogo } from '../../cmps/AppHeader/Logo/logo'
import { ImgCarousel } from '../Home/cmps/img-carousel'
import { StayAirCover } from '../Stay/cmps/StayDetails/stay-air-cover'
import { RootStateProps } from '../../store/store'

export function TripDetails() {
    const isMobile = useSelector((storeState: RootStateProps) => storeState.appModule.isMobile)

    const onOpenImgCarouselModal = () => {
        // imgCarouselModal
        // contactHostModal
        // aircover modal
    }

    // TODO: find a godo name for stay-wrapper

    return (
        <section className='main-layout trip-details'>
            {!isMobile && (
                <header className='full header'>
                    <AppLogo />
                </header>
            )}
            <div className='stay-wrapper'>
                <ImgCarousel imgUrls={[]} onOpenGalleryModal={onOpenImgCarouselModal} />
                <div className='trip-dates-wrapper'>
                    <div className='check-in-wrapper'>
                        <p>Check-in</p>
                        <h4>Sun, May 15</h4>
                        <span>15:00 PM</span>
                    </div>
                    <div className='check-out-wrapper'>
                        <p>Checkout</p>
                        <h4>Mon, May 16</h4>
                        <span>11:00 AM</span>
                    </div>
                </div>
                <div className='message-host'>
                    <img src='' alt='message-svg' />
                    <>
                        <h4>Message your host</h4>
                        <span className='host-name'></span>
                    </>
                </div>
                <div className='stay-info'>
                    <img src='' alt='stay-svg' />
                    <>
                        <h4>Your place</h4>
                        <span className='stay-name'></span>
                    </>
                </div>
            </div>
            <div className='reservation-details'>
                <h2>Reservation Details</h2>
                <div className='trip-guests'>
                    <h4>Who's coming</h4>
                    <p>utilService.formatGuests</p>
                    <img src='' alt='guest-svg' />
                </div>
                <div className='confirmation-code'>
                    <h4>Confirmation code</h4>
                    <span>reservation._id</span>
                </div>
                <div className='air-cover-wrapper'>
                    <StayAirCover onOpenModal={onOpenImgCarouselModal} />
                </div>
                <div className='cancellation-policy'>
                    <h4>Cancellation policy</h4>
                    <p>Free cancellation before 3:00 PM on May 10. After that, the reservation is non-refundable.</p>
                </div>
            </div>
            <div className='rules-and-instructions'>
                <h2>Rules and instructions</h2>
                <h4>House rules</h4>
                <p>Self check-in with Lockbox</p>
                <p>7 guests maximum</p>
                <p>Pets allowed</p>
                <div className='show-listing'>
                    <img src='' alt='stay-small-svg' />
                    <p>Show listing</p>
                    grNext
                </div>
            </div>
            <div className='host-wrapper'>
                <h2>Hosted by utilService.getFirstName</h2>
                <img src='' alt='stay.host.imgUrl' />
                <button className='btn btn-show-more'>Show more...</button>
            </div>
            <div className='payment-info'>
                <h2>Payment info</h2>
                <h4>Total cost</h4>
                <p>$reservation.totalPayout</p>
            </div>
        </section>
    )
}
