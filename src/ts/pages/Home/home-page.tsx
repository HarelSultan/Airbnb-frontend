import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { StayProps } from '../../interfaces/stay-interface'
import { RootStateProps } from '../../store/store'

import { AppHeader } from '../../cmps/AppHeader/app-header'
import { Filter } from './cmps/filter'
import { StayList } from './cmps/stay-list'
import { loadStays } from '../../store/stay/stay.action'
import { stayService } from '../../services/stay.service'
import { SearchByProps } from '../../interfaces/search-by-interface'

export function HomePage() {
    const stays: StayProps[] = useSelector((storeState: RootStateProps) => storeState.stayModule.stays)
    const filterBy = useSelector((storeState: RootStateProps) => storeState.stayModule.filterBy)
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search)
        const searchBy = stayService.getParamsSearchBy(searchParams)
        onLoadStays(searchBy)
    }, [filterBy, location.search])

    const onLoadStays = (searchBy: SearchByProps) => {
        try {
            loadStays(searchBy, filterBy)
        } catch (err) {
            // Show error msg
            console.log('Getting stays failed with error:', err)
        }
    }

    const onStayDetails = (stayId: string) => {
        navigate(`/stay/${stayId}`)
    }

    return (
        <section className='main-layout home-page'>
            <AppHeader />
            <Filter />
            <StayList stays={stays} onStayDetails={onStayDetails} />
        </section>
    )
}
