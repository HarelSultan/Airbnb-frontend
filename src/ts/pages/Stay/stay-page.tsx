import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppHeader } from '../../cmps/AppHeader/app-header'
import { StayProps } from '../../interfaces/stay-interface'
import { stayService } from '../../services/stay.service'
import { ReserveStay } from './cmps/reserve-stay'
import { StayGallery } from './cmps/stay-gallery'
import { StayHeader } from './cmps/stay-header'
import { StayDetails } from './cmps/StayDetails/stay-details'
import { StayReviews } from './cmps/StayReviews/stay-reviews'

export function StayPage() {
    const [selectedStay, setSelectedStay] = useState<StayProps | null>(null)

    const { stayId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadStay()
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

    // const reserveStayProps = {
    //     price: selectedStay?.price,
    //     reviews: selectedStay?.reviews,
    //     takenDates: selectedStay?.takenDates,
    // }

    if (!selectedStay) return <section>Loadin'</section>
    return (
        <section className='main-layout stay-page'>
            <AppHeader />
            <StayHeader stay={selectedStay} />
            <StayGallery imgUrls={selectedStay.imgUrls} />
            <div className='layout-wrapper'>
                <StayDetails stay={selectedStay} />
                <ReserveStay
                    price={selectedStay.price}
                    reviews={selectedStay.reviews}
                    takenDates={selectedStay.takenDates}
                />
            </div>
            <StayReviews reviews={selectedStay.reviews} />
        </section>
    )
}
