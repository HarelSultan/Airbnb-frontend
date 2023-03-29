import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { StayProps } from '../../interfaces/stay-interface'
import { RootStateProps } from '../../store/store'

import { AppHeader } from '../../cmps/AppHeader/app-header'
import { Filter } from './cmps/filter'
import { StayList } from './cmps/stay-list'
import { loadStays } from '../../store/stay/stay.action'

export function HomePage() {
    const stays: StayProps[] = useSelector((storeState: RootStateProps) => storeState.stayModule.stays)
    const filterBy = useSelector((storeState: RootStateProps) => storeState.stayModule.filterBy)
    const location = useLocation()

    useEffect(() => {
        console.log(location.search)
        onLoadStays()
    }, [filterBy])

    const onLoadStays = () => {
        try {
            loadStays(filterBy)
        } catch (err) {
            // Show error msg
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
