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

export function BookingPage() {
    const [selectedStay, setSelectedStay] = useState<StayProps | null>(null)
    const [reserveBy, setReserveBy] = useState<ReserveByProps | null>(null)

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

    const onGoBack = () => {
        navigate(-1)
    }

    const onCompleteReservation = () => {}

    const nightsCount = utilService.getNightsCount(reserveBy) || 1

    if (!selectedStay || !reserveBy) return <section>Loadin'</section>
    const stayBookingProps = {
        stay: selectedStay,
        reserveBy,
        nightsCount,
        onCompleteReservation,
        loggedInUser,
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

            <AppFooter />
        </section>
    )
}
