import { useEffect, useState } from 'react'
import { AppHeader } from '../../cmps/AppHeader/app-header'
import { StayProps } from '../../interfaces/stay-interface'
import { stayService } from '../../services/stay.service'
import { Filter } from './cmps/filter'
import { StayList } from './cmps/stay-list'

export function HomePage() {
    const [stays, setStays] = useState<StayProps[] | []>([])

    useEffect(() => {
        loadStays()
    }, [])

    const loadStays = async () => {
        try {
            const stays = await stayService.query()
            setStays(stays)
        } catch (err) {
            console.log('Getting stays failed with error:', err)
        }
    }

    const onStayDetails = (stayId: string) => {
        console.log(stayId)
    }

    return (
        <section className='main-layout home-page'>
            <AppHeader />
            <Filter />
            <StayList stays={stays} onStayDetails={onStayDetails} />
        </section>
    )
}
