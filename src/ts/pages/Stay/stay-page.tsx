import { useState, useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { AppHeader } from '../../cmps/AppHeader/app-header'
import { StayProps } from '../../interfaces/stay-interface'
import { stayService } from '../../services/stay.service'
import { ReserveStay } from './cmps/ReserveStay/reserve-stay'
import { StayGallery } from './cmps/stay-gallery'
import { StayHeader } from './cmps/stay-header'
import { StayDetails } from './cmps/StayDetails/stay-details'
import { StayReviews } from './cmps/StayReviews/stay-reviews'
import { ReserveByProps } from '../../interfaces/reserve-by-interface'
import { utilService } from '../../services/util.service'
import { StayMap } from './cmps/stay-map'
import { StayHost } from './cmps/stay-host'
import { StayThingsToKnow } from './cmps/things-to-know'
import { AppFooter } from '../../cmps/app-footer'

export function StayPage() {
    const [selectedStay, setSelectedStay] = useState<StayProps | null>(null)
    const [reserveBy, setReserveBy] = useState<ReserveByProps | null>(null)

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
            <AppHeader />
            <StayHeader stay={selectedStay} />
            <StayGallery imgUrls={selectedStay.imgUrls} />
            <div className='layout-wrapper'>
                <StayDetails
                    stay={selectedStay}
                    takenDates={selectedStay.takenDates}
                    reserveBy={reserveBy}
                    onSetReserveBy={onSetReserveBy}
                    nightsCount={nightsCount}
                />
                <ReserveStay
                    price={selectedStay.price}
                    reviews={selectedStay.reviews}
                    takenDates={selectedStay.takenDates}
                    reserveBy={reserveBy}
                    onSetReserveBy={onSetReserveBy}
                    onReserveStay={onReserveStay}
                    nightsCount={nightsCount}
                />
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
