import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { utilService } from '../../services/util.service'

import { AppLogo } from '../../cmps/AppHeader/Logo/logo'
import { Map } from '../../cmps/map'
import { ImgCarousel } from '../Home/cmps/img-carousel'
import { StayAirCover } from '../Stay/cmps/StayDetails/stay-air-cover'

import { RootStateProps } from '../../store/store'
import { ReservationProps } from '../../interfaces/user-interface'

import { GrFormNext, GrNext } from 'react-icons/gr'
import { BiArrowBack } from 'react-icons/bi'
import { Modal, ModalProps } from '../../cmps/modal'
import { StayImgCarousel } from '../Stay/cmps/stay-img-carousel'
import { ContactHost } from '../Stay/cmps/contact-host'
import { CONTACT_HOST_MODAL } from '../Stay/stay-page'
import { reservationService } from '../../services/reservation.service'

export function TripDetails() {
    const [selectedTrip, setSelectedTrip] = useState<ReservationProps | null>(null)
    const [expandedModal, setExpandedModal] = useState<string | null>(null)

    const loggedInUser = useSelector((storeState: RootStateProps) => storeState.userModule.loggedInUser)
    const isMobile = useSelector((storeState: RootStateProps) => storeState.appModule.isMobile)

    const navigate = useNavigate()
    const { tripId } = useParams()

    useEffect(() => {
        loadTrip()
    }, [])

    const loadTrip = async () => {
        // const trip = loggedInUser?.trips.find(trip => trip._id === tripId)
        // trip ? setSelectedTrip(trip) : navigate('/')
        if (!tripId) return
        try {
            let trip
            // Trying to minimize server request and get the selectedTrip from the global state user
            if (loggedInUser?.trips?.length) trip = loggedInUser.trips.find(trip => trip._id === tripId)
            // If the attempt failed, getting the selectedTrip from the server.
            if (!trip) trip = await reservationService.getById(tripId)
            setSelectedTrip(trip)
        } catch (err) {
            // TODO: showErrorMsg('Cannot load your trip, try again later')
            console.log('Failed to load user trip with error', err)
        }
    }

    const onOpenImgCarouselModal = () => {
        // imgCarouselModal
        // contactHostModal
        // aircover modal
    }

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('default', { weekday: 'short', month: 'short', day: 'numeric' })
    }

    const onSetExpandedModal = (expandedModal: string | null) => {
        setExpandedModal(expandedModal)
    }

    const onSendHostMessage = (msg: string) => {
        console.log(msg)
    }

    // TODO: find a godo name for stay-wrapper
    if (!selectedTrip) return <div>Trip skeleton</div>

    type ModalMap = {
        [key: string]: ModalProps
    }

    const tripModalsMap: ModalMap = {
        imgCarouselModal: {
            className: 'img-carousel-modal',
            onCloseModal: () => onSetExpandedModal(null),
            headerTxt: null,
            children: <ImgCarousel imgUrls={selectedTrip.stayImgsUrl} />,
        },

        contactHostModal: {
            className: 'contact-host-modal',
            onCloseModal: () => onSetExpandedModal(null),
            headerTxt: null,
            children: <ContactHost host={selectedTrip.host} amenities={[]} onSendHostMessage={onSendHostMessage} />,
        },
    }

    const hostFirstName = utilService.getFirstName(selectedTrip.host.fullname)
    const checkIn = new Date(selectedTrip.reservationDates.checkIn)
    const checkOut = new Date(selectedTrip.reservationDates.checkOut)
    const lastCancellationDate = new Date(checkIn)
    lastCancellationDate.setDate(checkIn.getDate() - 1)

    return (
        <section className='trip-details'>
            {!isMobile && (
                <header className='header'>
                    <AppLogo />
                </header>
            )}
            <div className='main-layout layout-wrapper'>
                {!isMobile && <Map lat={selectedTrip.stayLocation.lat} lng={selectedTrip.stayLocation.lng} />}
                <div className='trip-wrapper'>
                    <div className='wrapper'>
                        <div className={`carousel-wrapper ${isMobile ? 'full' : ''}`}>
                            <ImgCarousel imgUrls={selectedTrip?.stayImgsUrl} onOpenGalleryModal={onSetExpandedModal} />
                            <button onClick={() => navigate(-1)} className='btn btn-go-back'>
                                <BiArrowBack />
                            </button>
                        </div>
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
                        <div className='message-host-wrapper'>
                            <img
                                src='https://res.cloudinary.com/dotasvsuv/image/upload/v1683373329/uczdfcwovytqsgu9oyzh.svg'
                                alt='message-svg'
                            />
                            <div onClick={() => onSetExpandedModal(CONTACT_HOST_MODAL)} className='message-host'>
                                <h4>Message your host</h4>
                                <span className='host-name'>{hostFirstName}</span>
                            </div>
                        </div>
                        <div onClick={() => navigate(`/stay/${selectedTrip.stayId}`)} className='stay-info-wrapper'>
                            <img
                                src='https://res.cloudinary.com/dotasvsuv/image/upload/v1683373349/nj4yzchkqwcyra6jfhbz.svg'
                                alt='stay-svg'
                            />
                            <div className='stay-info'>
                                <h4>Your place</h4>
                                <span className='stay-name'>{selectedTrip.stayName}</span>
                            </div>
                        </div>
                        <div className='reservation-details-wrapper'>
                            <h2>Reservation Details</h2>
                            <div className='trip-guests-wrapper'>
                                <div className='trip-guests'>
                                    <h4>Who's coming</h4>
                                    <p>{utilService.formatGuestCount(selectedTrip.guests)}</p>
                                </div>
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
                                <p>Your booking is protected by</p>
                                <img
                                    className='air-cover-img'
                                    src='https://res.cloudinary.com/dotasvsuv/image/upload/v1680445107/f9axjhl7sxlnhy5owbbw.webp'
                                    alt=''
                                />
                            </div>
                            <div className='cancellation-policy'>
                                <h4>Cancellation policy</h4>
                                <p>
                                    Free cancellation before 3:00 PM on {utilService.formatDate(lastCancellationDate)}.
                                    After that, the reservation is non-refundable.
                                </p>
                            </div>
                        </div>
                        <h2>Rules and instructions</h2>
                        <div className='stay-rules'>
                            <h4>House rules</h4>
                            <p>Self check-in with Lockbox</p>
                            <p>7 guests maximum</p>
                            <p>Pets allowed</p>
                        </div>
                        <div onClick={() => navigate(`/stay/${selectedTrip.stayId}`)} className='show-listing'>
                            <img
                                src='https://res.cloudinary.com/dotasvsuv/image/upload/v1683373440/epea89jtgpzil4wakxmo.svg'
                                alt='stay-small-svg'
                            />
                            <p>Show listing</p>
                            <GrFormNext />
                        </div>
                        <div className='host-wrapper'>
                            <h2>Hosted by {hostFirstName}</h2>
                            <img src={selectedTrip.host.imgUrl} alt='stay.host.imgUrl' />
                        </div>
                        <div className='payment-info'>
                            <h2>Payment info</h2>
                            <h4>Total cost</h4>
                            <p>${selectedTrip.totalPayout} USD</p>
                        </div>
                    </div>
                </div>
            </div>
            {expandedModal && <Modal {...tripModalsMap[expandedModal]} />}
        </section>
    )
}
