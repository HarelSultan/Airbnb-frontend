import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { RootStateProps } from '../../store/store'
import { stayService } from '../../services/stay.service'
import { utilService } from '../../services/util.service'

import { ReserveByProps } from '../../interfaces/reserve-by-interface'
import { StayProps } from '../../interfaces/stay-interface'

import { AppLogo } from '../../cmps/AppHeader/Logo/logo'
import { AppFooter } from '../../cmps/app-footer'
import { MobileStayBooking } from './cmps/mobile-stay-booking'
import { DesktopStayBooking } from './cmps/desktop-stay-booking'

import { GrPrevious } from 'react-icons/gr'
import { Modal, ModalProps } from '../../cmps/modal'
import { PriceBreakdown } from '../../cmps/price-breakdown'
import { ReserveDates } from '../Stay/cmps/ReserveStay/cmps/reserve-dates'
import { AiFillStar } from 'react-icons/ai'
import { CtaBtn } from '../../cmps/cta-btn'
import { GuestsModal } from './cmps/guests-modal'
import { ReservationSummary } from '../../cmps/reservation-summary'

export const RESERVE_GUESTS_MODAL = 'reserveGuestsModal'
export const RESERVATION_SUMMARY_MODAL = 'reservationSummaryModal'

export function BookingPage() {
    const [selectedStay, setSelectedStay] = useState<StayProps | null>(null)
    const [reserveBy, setReserveBy] = useState<ReserveByProps | null>(null)
    const [expandedModal, setExpandedModal] = useState<string | null>(null)

    const isMobile = useSelector((storeState: RootStateProps) => storeState.appModule.isMobile)
    const loggedInUser = useSelector((storeState: RootStateProps) => storeState.userModule.loggedInUser)

    const { stayId } = useParams()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        loadStay()
        loadReserveBy()
    }, [])

    const loadStay = async () => {
        if (stayId) {
            try {
                const stay = await stayService.getById(stayId)
                setSelectedStay(stay)
                console.log(stay)
            } catch (err) {
                console.log('Had trouble loading selected stay at stay page with error', err)
                navigate('/')
            }
        } else {
            navigate('/')
        }
    }

    const loadReserveBy = () => {
        const searchParams = new URLSearchParams(location.search)
        const searchBy = stayService.getParamsSearchBy(searchParams)
        setReserveBy(stayService.getReserveByProps(searchBy))
    }

    const onSetReserveBy = (updatedReservation: ReserveByProps) => {
        setReserveBy(updatedReservation)
    }

    const onSetExpandedModal = (expandedModal: string | null) => {
        setExpandedModal(expandedModal)
    }

    const onCancelGuestsEdit = () => {}

    const onGoBack = () => {
        navigate(-1)
    }

    const onCompleteReservation = () => {
        onSetExpandedModal(RESERVATION_SUMMARY_MODAL)
    }

    const nightsCount = utilService.getNightsCount(reserveBy) || 1

    if (!selectedStay || !reserveBy) return <section>Loadin'</section>

    type ModalMap = {
        [key: string]: ModalProps
    }

    const stayModalsMap: ModalMap = {
        reserveDatesModal: {
            className: 'reserve-dates-modal',
            onCloseModal: () => onSetExpandedModal(null),
            headerTxt: null,
            children: (
                <>
                    <ReserveDates
                        takenDates={selectedStay.takenDates}
                        reserveBy={reserveBy}
                        onSetReserveBy={onSetReserveBy}
                        nightsCount={nightsCount}
                    />
                    <div className='modal-footer'>
                        <div className='reservation-info'>
                            <p className='pricing'>
                                <span className='nightly-price'>${selectedStay.price}</span> night
                            </p>
                            <p className='rating'>
                                <AiFillStar />
                                <span>{stayService.getStayAverageRating(selectedStay.reviews).toFixed(1)}</span>
                            </p>
                        </div>
                        <CtaBtn onClickCB={() => onSetExpandedModal(null)} txt='Save' />
                    </div>
                </>
            ),
        },
        reserveGuestsModal: {
            className: 'reserve-guests-modal',
            onCloseModal: () => onSetExpandedModal(null),
            headerTxt: 'Guests',
            children: (
                <GuestsModal
                    reserveBy={reserveBy}
                    onSetReserveBy={onSetReserveBy}
                    onSetExpandedModal={onSetExpandedModal}
                />
            ),
        },
        priceBreakdownModal: {
            className: 'price-breakdown-modal',
            onCloseModal: () => onSetExpandedModal(null),
            headerTxt: 'Base Price Breakdown',
            children: (
                <PriceBreakdown checkIn={reserveBy.checkIn} checkOut={reserveBy.checkOut} price={selectedStay.price} />
            ),
        },
        cleaningFeeModal: {
            className: 'price-breakdown-modal',
            onCloseModal: () => onSetExpandedModal(null),
            headerTxt: 'Cleaning Fee',
            children: <div>One-time fee charged by host to cover the cost of cleaning their spaces</div>,
        },
        airbnbServiceModal: {
            className: 'price-breakdown-modal',
            onCloseModal: () => onSetExpandedModal(null),
            headerTxt: 'Airbnb Service',
            children: <div>This helps us run our platform and offer services like 24/7 support on your trip.</div>,
        },
        reservationSummaryModal: {
            className: 'reservation-summary-modal',
            onCloseModal: () => navigate('/'),
            headerTxt: null,
            children: (
                <>
                    <h2>Reservation complete!</h2>
                    <p className='host-confirmation'>
                        Your booking has been sent to the your host, you can watch the status of your reservation in
                        your profile.
                    </p>
                    <ReservationSummary reserveBy={reserveBy} stay={selectedStay} nightsCount={nightsCount} />
                    <CtaBtn onClickCB={() => navigate('/')} txt={'Look for more places to stay'} />
                </>
            ),
        },
    }

    const stayBookingProps = {
        stay: selectedStay,
        reserveBy,
        nightsCount,
        onCompleteReservation,
        loggedInUser,
        onSetExpandedModal,
    }

    return (
        <section className='main-layout secondary-layout booking-page'>
            {!isMobile && (
                <header className='full booking-header'>
                    <AppLogo />
                </header>
            )}
            <section className={`confirmation-header ${isMobile ? 'full' : ''}`}>
                <button onClick={onGoBack} className='btn btn-go-back'>
                    <GrPrevious />
                </button>
                <h2>Confirm and pay</h2>
            </section>

            {isMobile ? <MobileStayBooking {...stayBookingProps} /> : <DesktopStayBooking {...stayBookingProps} />}
            {expandedModal && <Modal {...stayModalsMap[expandedModal]} />}
            <AppFooter />
        </section>
    )
}
