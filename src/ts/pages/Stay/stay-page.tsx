import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppHeader } from '../../cmps/AppHeader/app-header'
import { StayProps } from '../../interfaces/stay-interface'
import { stayService } from '../../services/stay.service'
import { StayGallery } from './cmps/stay-gallery'
import { StayHeader } from './cmps/stay-header'

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
    if (!selectedStay) return <section>Loadin'</section>
    return (
        <section className='main-layout stay-page'>
            <AppHeader />
            <StayHeader stay={selectedStay} />
            <StayGallery imgUrls={selectedStay.imgUrls} />
        </section>
    )
}
