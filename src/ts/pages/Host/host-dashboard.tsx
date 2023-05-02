import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { stayService } from '../../services/stay.service'
import { changeReservationStatus } from '../../store/user/user.action'

import { AppLogo } from '../../cmps/AppHeader/Logo/logo'
import { HostCharts } from './host-charts'
import { Reservations } from './reservations'

import { ReservationProps } from '../../interfaces/user-interface'
import { RootStateProps } from '../../store/store'

export function HostDashboard() {
    const loggedInUser = useSelector((storeState: RootStateProps) => storeState.userModule.loggedInUser)
    const navigate = useNavigate()

    useEffect(() => {
        if (!loggedInUser) navigate('/')
    }, [])

    const onChangeReservationStatus = async (reservation: ReservationProps, isApproved: boolean) => {
        if (!loggedInUser) return
        try {
            await changeReservationStatus(loggedInUser, reservation, isApproved)
        } catch (err) {
            // TODO: showErrorMsg(err.txt)
        }
    }

    const listingsName = loggedInUser?.listings?.map(listing => listing.name) || ['']

    if (loggedInUser?.listingReservations) {
        const data = stayService.getHostDashboardData(loggedInUser.listingReservations)
    }

    return (
        <section className='main-layout host-dashboard'>
            <header className='full host-header'>
                <AppLogo />
            </header>

            {!loggedInUser?.listingReservations?.length ? (
                <div>No Reservations</div>
            ) : (
                <>
                    <HostCharts
                        listingsName={listingsName}
                        hostChartData={stayService.getHostDashboardData(loggedInUser.listingReservations)}
                    />
                    <Reservations
                        listingReservations={loggedInUser.listingReservations}
                        onChangeReservationStatus={onChangeReservationStatus}
                    />
                </>
            )}
        </section>
    )
}
