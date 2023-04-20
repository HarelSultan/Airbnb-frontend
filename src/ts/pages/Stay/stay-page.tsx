import { useState, useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { stayService } from '../../services/stay.service'
import { utilService } from '../../services/util.service'

import { StayProps } from '../../interfaces/stay-interface'
import { ReserveByProps } from '../../interfaces/reserve-by-interface'
import { RootStateProps } from '../../store/store'

import { AppHeader } from '../../cmps/AppHeader/app-header'
import { StayHeader } from './cmps/stay-header'
import { StayGallery } from './cmps/stay-gallery'
import { StayDetails } from './cmps/StayDetails/stay-details'
import { ReserveStay } from './cmps/ReserveStay/reserve-stay'
import { StayMap } from './cmps/stay-map'
import { StayHost } from './cmps/stay-host'
import { StayThingsToKnow } from './cmps/things-to-know'
import { AppFooter } from '../../cmps/app-footer'
import { StayImgCarousel } from './cmps/stay-img-carousel'
import { StayReviews } from './cmps/StayReviews/stay-reviews'
import { MobileReserveStay } from './cmps/ReserveStay/mobile-reserve-stay'
import { LoginSignupDisplayProps } from '../Home/home-page'
import { updateWishList } from '../../store/user/user.action'
import { Modal, ModalProps } from '../../cmps/modal'
import { LoginSignup } from '../../cmps/login-signup'
import { AirCoverExpanded } from './cmps/air-cover-expanded'

export const REVIEWS_MODAL = 'reviewsModal'
export const AIR_COVER_MODAL = 'airCoverModal'

export function StayPage() {
    const [selectedStay, setSelectedStay] = useState<StayProps | null>(null)
    const [reserveBy, setReserveBy] = useState<ReserveByProps | null>(null)
    const [expandedModal, setExpandedModal] = useState<string | null>(null)
    const [loginSignupDisplay, setLoginSignupDisplay] = useState<LoginSignupDisplayProps>({
        isOpen: false,
        isSignup: false,
    })

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
                navigate(-1)
            }
        } else {
            navigate(-1)
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

    const onReserveStay = () => {
        if (!selectedStay) return
        const searchParams = new URLSearchParams(location.search)
        searchParams.set('checkIn', selectedStay.randomAvaliableDates.checkIn.toString().slice(0, 10))
        searchParams.set('checkOut', selectedStay.randomAvaliableDates.checkOut.toString().slice(0, 10))
        if (!searchParams.get('adults')) searchParams.set('adults', '1')
        navigate(`/book/${selectedStay._id}?${searchParams}`)
    }

    const onToggleSaveStay = async (ev: React.MouseEvent<HTMLButtonElement>) => {
        console.log('toggling')
        ev.stopPropagation()
        // TODO: should remove null props from selectedStay
        if (!selectedStay) return
        if (!loggedInUser) return onToggleLoginSignup()
        try {
            updateWishList(loggedInUser, selectedStay._id)
            // TODO: ShowSucessMsg(`${stay.name saved to wish list.}`)
        } catch (err: any) {
            // TODO: ShowErrorMsg(err.msg)
            console.log(err.msg)
        }
    }

    const onSetExpandedModal = (expandedModal: string | null) => {
        setExpandedModal(expandedModal)
    }

    const onToggleLoginSignup = (isSignup: boolean = false) => {
        setLoginSignupDisplay(prevState => ({ isOpen: !prevState.isOpen, isSignup }))
    }

    const nightsCount = utilService.getNightsCount(reserveBy) || 1

    if (!selectedStay || !reserveBy) return <section>Loadin'</section>

    const isStaySaved: boolean = loggedInUser?.stayWishList.includes(selectedStay?._id) || false

    type ModalMap = {
        [key: string]: ModalProps
    }

    const stayModalsMap: ModalMap = {
        reviewsModal: {
            className: 'reviews-modal',
            onCloseModal: () => onSetExpandedModal(null),
            headerTxt: null,
            children: <StayReviews reviews={selectedStay.reviews} isExpanded={true} isMobile={isMobile} />,
        },
        airCoverModal: {
            className: 'air-cover-modal',
            onCloseModal: () => onSetExpandedModal(null),
            headerTxt: null,
            children: <AirCoverExpanded />,
        },
    }

    const stayHeaderProps = {
        stay: selectedStay,
        isMobile,
        onToggleSaveStay,
        isStaySaved,
        onOpenReviewsModal: onSetExpandedModal,
    }

    const reserveStayProps = {
        price: selectedStay?.price,
        reviews: selectedStay?.reviews,
        takenDates: selectedStay?.takenDates,
        reserveBy,
        onSetReserveBy,
        onReserveStay,
        nightsCount,
    }

    const stayDetailsProps = {
        stay: selectedStay,
        takenDates: selectedStay?.takenDates,
        reserveBy,
        onSetReserveBy,
        nightsCount,
        onOpenModal: onSetExpandedModal,
    }

    // const reviewsModalProps = {
    //     className: 'reviews-modal',
    //     onCloseModal: onToggleReviewsModalDisplay,
    //     headerTxt: null,
    //     children: <StayReviews reviews={selectedStay.reviews} isExpanded={true} isMobile={isMobile} />,
    // }

    const loginSignupModalProps = {
        className: 'login-signup-modal',
        onCloseModal: onToggleLoginSignup,
        headerTxt: 'Welcome to Airbnb',
        children: <LoginSignup isSignningUp={loginSignupDisplay.isSignup} onLoginSignupCB={onToggleLoginSignup} />,
    }

    return (
        <section className='main-layout secondary-layout stay-page'>
            {!isMobile && <AppHeader onToggleLoginSignup={onToggleLoginSignup} loggedInUser={loggedInUser} />}
            {isMobile && (
                <StayImgCarousel
                    imgUrls={selectedStay.imgUrls}
                    onToggleSaveStay={onToggleSaveStay}
                    isStaySaved={isStaySaved}
                />
            )}

            <StayHeader {...stayHeaderProps} />
            {!isMobile && <StayGallery imgUrls={selectedStay.imgUrls} />}

            <div className='layout-wrapper'>
                <StayDetails {...stayDetailsProps} />
                {isMobile ? (
                    <MobileReserveStay price={selectedStay.price} reserveBy={reserveBy} onReserveStay={onReserveStay} />
                ) : (
                    <ReserveStay {...reserveStayProps} />
                )}
            </div>

            <StayReviews
                reviews={selectedStay.reviews}
                onOpenReviewsModal={onSetExpandedModal}
                isExpanded={false}
                isMobile={isMobile}
            />

            <StayMap
                lat={selectedStay.loc.lat}
                lng={selectedStay.loc.lng}
                stayArea={selectedStay.loc.address}
                staySummary={selectedStay.summary}
            />

            <StayHost host={selectedStay.host} />
            <StayThingsToKnow
                amenities={selectedStay.amenities}
                guestsCount={selectedStay.stayDetails.guests}
                checkIn={reserveBy.checkIn}
            />

            {expandedModal && <Modal {...stayModalsMap[expandedModal]} />}
            {loginSignupDisplay.isOpen && !loggedInUser && <Modal {...loginSignupModalProps} />}
            <AppFooter />
        </section>
    )
}
