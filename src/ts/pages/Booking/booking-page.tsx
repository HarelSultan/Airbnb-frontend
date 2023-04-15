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
            <section className='trip-details'>
                <h4>Your trip</h4>
                <div className='trip-dates'>
                    <h5>Dates</h5>
                    <p>{utilService.formatDateRange({ checkIn: reserveBy.checkIn, checkOut: reserveBy.checkOut })}</p>
                    <button className='btn btn-edit'>Edit</button>
                </div>
                <div className='trip-check-in-time'>
                    <h5>Check-in time</h5>
                    <p>8:00 PM - 10:00 PM</p>
                    <button className='btn btn-edit'>Edit</button>
                </div>
                <div className='trip-guests'>
                    <h5>Guests</h5>
                    <p>{utilService.formatGuestCount(reserveBy.guests)}</p>
                    <button className='btn btn-edit'>Edit</button>
                </div>
            </section>

            {isMobile && (
                <section className='price-details'>
                    <h4>Price details</h4>
                    <PricingSummary nightlyPrice={selectedStay.price} nightsCount={nightsCount} />
                </section>
            )}
            <section className='login-signup'>
                <h4>Log in or sign up to book</h4>

                <CtaBtn onClickCB={onReservationComplete} txt={'Continue'} />
            </section>
            <AppFooter />
        </section>
    )
}
