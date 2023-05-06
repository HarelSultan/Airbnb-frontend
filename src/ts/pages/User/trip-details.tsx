import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { utilService } from '../../services/util.service'

import { AppLogo } from '../../cmps/AppHeader/Logo/logo'
import { ImgCarousel } from '../Home/cmps/img-carousel'
import { StayAirCover } from '../Stay/cmps/StayDetails/stay-air-cover'

import { RootStateProps } from '../../store/store'
import { ReservationProps } from '../../interfaces/user-interface'

import { GrNext } from 'react-icons/gr'
import { Map } from '../../cmps/map'

export function TripDetails() {
    const [selectedTrip, setSelectedTrip] = useState<ReservationProps | null>(null)

    const loggedInUser = useSelector((storeState: RootStateProps) => storeState.userModule.loggedInUser)
    const isMobile = useSelector((storeState: RootStateProps) => storeState.appModule.isMobile)

    const navigate = useNavigate()
    const { tripId } = useParams()

    useEffect(() => {
        loadTrip()
    }, [])

    const loadTrip = () => {
        const trip = loggedInUser?.trips.find(trip => trip._id === tripId)
        trip ? setSelectedTrip(trip) : navigate('/')
    }

    const onOpenImgCarouselModal = () => {
        // imgCarouselModal
        // contactHostModal
        // aircover modal
    }

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('default', { weekday: 'short', month: 'short', day: 'numeric' })
    }

    // TODO: find a godo name for stay-wrapper
    if (!selectedTrip) return <div>Trip skeleton</div>

    const hostFirstName = utilService.getFirstName(selectedTrip.host.fullname)
    const checkIn = new Date(selectedTrip.reservationDates.checkIn)
    const checkOut = new Date(selectedTrip.reservationDates.checkOut)
    const lastCancellationDate = new Date(checkIn)
    lastCancellationDate.setDate(checkIn.getDate() - 1)

    return (
        <section className='main-layout trip-details'>
            {!isMobile && (
                <header className='full header'>
                    <AppLogo />
                </header>
            )}
            <div className='trip-wrapper'>
                {!isMobile && <Map lat={selectedTrip.stayLocation.lat} lng={selectedTrip.stayLocation.lng} />}
                <>
                    <div className='stay-wrapper'>
                        <ImgCarousel imgUrls={selectedTrip?.stayImgsUrl} onOpenGalleryModal={onOpenImgCarouselModal} />
                        <div className='trip-dates-wrapper'>
                            <div className='check-in-wrapper'>
                                <p>Check-in</p>
                                <h4>{formatDate(checkIn)}</h4>
                                <span>15:00 PM</span>
                            </div>
                            <div className='check-out-wrapper'>
                                <p>Checkout</p>
                                <h4>{formatDate(checkOut)}</h4>
                                <span>11:00 AM</span>
                            </div>
                        </div>
                        <div className='message-host'>
                            <img
                                src='https://res.cloudinary.com/dotasvsuv/image/upload/v1683373329/uczdfcwovytqsgu9oyzh.svg'
                                alt='message-svg'
                            />
                            <>
                                <h4>Message your host</h4>
                                <span className='host-name'>{hostFirstName}</span>
                            </>
                        </div>
                        <div className='stay-info'>
                            <img
                                src='https://res.cloudinary.com/dotasvsuv/image/upload/v1683373349/nj4yzchkqwcyra6jfhbz.svg'
                                alt='stay-svg'
                            />
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
                            <p>{utilService.formatGuestCount(selectedTrip.guests)}</p>
                            <img
                                src='https://res.cloudinary.com/dotasvsuv/image/upload/v1683373391/eh2r5z8phoctktynlf26.png'
                                alt='guest-svg'
                            />
                        </div>
                        <div className='confirmation-code'>
                            <h4>Confirmation code</h4>
                            <span>{selectedTrip._id}</span>
                        </div>
                        <div className='air-cover-wrapper'>
                            <StayAirCover onOpenModal={onOpenImgCarouselModal} />
                        </div>
                        <div className='cancellation-policy'>
                            <h4>Cancellation policy</h4>
                            <p>
                                Free cancellation before 3:00 PM on {utilService.formatDate(lastCancellationDate)}.
                                After that, the reservation is non-refundable.
                            </p>
                        </div>
                    </div>
                    <div className='rules-and-instructions'>
                        <h2>Rules and instructions</h2>
                        <h4>House rules</h4>
                        <p>Self check-in with Lockbox</p>
                        <p>7 guests maximum</p>
                        <p>Pets allowed</p>
                        <div className='show-listing'>
                            <img
                                src='https://res.cloudinary.com/dotasvsuv/image/upload/v1683373440/epea89jtgpzil4wakxmo.svg'
                                alt='stay-small-svg'
                            />
                            <p>Show listing</p>
                            <GrNext />
                        </div>
                    </div>
                    <div className='host-wrapper'>
                        <h2>Hosted by {hostFirstName}</h2>
                        <img src={selectedTrip.host.imgUrl} alt='stay.host.imgUrl' />
                        <button className='btn btn-show-more'>Show more</button>
                    </div>
                    <div className='payment-info'>
                        <h2>Payment info</h2>
                        <h4>Total cost</h4>
                        <p>${selectedTrip.totalPayout}</p>
                    </div>
                </>
            </div>
        </section>
    )
}
