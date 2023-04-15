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

export function StayPage() {
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

    const onReserveStay = () => {}

    const nightsCount = utilService.getNightsCount(reserveBy) || 1

    // const reserveStayProps = {
    //     price: selectedStay?.price,
    //     reviews: selectedStay?.reviews,
    //     takenDates: selectedStay?.takenDates,
    //     reserveBy:{reserveBy}
    // }

    if (!selectedStay || !reserveBy) return <section>Loadin'</section>
    return (
        <section className='main-layout stay-layout stay-page'>
            {!isMobile && <AppHeader />}
            {isMobile && <StayImgCarousel imgUrls={selectedStay.imgUrls} />}
            <StayHeader stay={selectedStay} isMobile={isMobile} />
            {!isMobile && <StayGallery imgUrls={selectedStay.imgUrls} />}
            <div className='layout-wrapper'>
                <StayDetails
                    stay={selectedStay}
                    takenDates={selectedStay.takenDates}
                    reserveBy={reserveBy}
                    onSetReserveBy={onSetReserveBy}
                    nightsCount={nightsCount}
                />
                {isMobile ? (
                    <MobileReserveStay price={selectedStay.price} reserveBy={reserveBy} onReserveStay={onReserveStay} />
                ) : (
                    <ReserveStay
                        price={selectedStay.price}
                        reviews={selectedStay.reviews}
                        takenDates={selectedStay.takenDates}
                        reserveBy={reserveBy}
                        onSetReserveBy={onSetReserveBy}
                        onReserveStay={onReserveStay}
                        nightsCount={nightsCount}
                    />
                )}
            </div>
            <StayReviews reviews={selectedStay.reviews} />
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
            <AppFooter />
        </section>
    )
}
