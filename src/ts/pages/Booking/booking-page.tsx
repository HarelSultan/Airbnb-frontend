import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { RootStateProps } from '../../store/store'
import { ReserveByProps } from '../../interfaces/reserve-by-interface'
import { StayProps } from '../../interfaces/stay-interface'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { stayService } from '../../services/stay.service'
import { utilService } from '../../services/util.service'
import { AppLogo } from '../../cmps/AppHeader/Logo/logo'

import { GrPrevious } from 'react-icons/gr'
import { PricingSummary } from '../Stay/cmps/ReserveStay/cmps/pricing-summary'
import { AppFooter } from '../../cmps/app-footer'
import { CtaBtn } from '../../cmps/cta-btn'
import { TripDetails } from './cmps/trip-details'
import { StayListingCard } from './cmps/stay-listing-card'
import { MobileStayBooking } from './cmps/mobile-stay-booking'
import { DesktopStayBooking } from './cmps/desktop-stay-booking'

export function BookingPage() {
    const [selectedStay, setSelectedStay] = useState<StayProps | null>(null)
    const [reserveBy, setReserveBy] = useState<ReserveByProps | null>(null)

    const isMobile = useSelector((storeState: RootStateProps) => storeState.appModule.isMobile)

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

    const onGoBack = () => {
        navigate(-1)
    }

    const onReservationComplete = () => {}

    const nightsCount = utilService.getNightsCount(reserveBy) || 1

    if (!selectedStay || !reserveBy) return <section>Loadin'</section>
    const stayBookingProps = {
        stay: selectedStay,
        reserveBy,
        nightsCount,
        onReservationComplete,
    }

    return (
        <section className='booking-page'>
            {!isMobile && (
                <header className='booking-header'>
                    <AppLogo />
                </header>
            )}
            <section className='confirmation-header'>
                <button onClick={onGoBack} className='btn btn-go-back'>
                    <GrPrevious />
                </button>
                <h2>Confirm and pay</h2>
            </section>

            {isMobile ? <MobileStayBooking {...stayBookingProps} /> : <DesktopStayBooking {...stayBookingProps} />}

            <AppFooter />
        </section>
    )
}

// Mobile - StayListingCard,AirCover. TripDetails. PriceDetails. LoginSignup

// Desktop LayoutWrapper -
