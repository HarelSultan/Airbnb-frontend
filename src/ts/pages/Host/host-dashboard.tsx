import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { reservationService } from '../../services/reservation.service'
import { stayService } from '../../services/stay.service'

import { UserPageHeader } from '../../cmps/user-page-header'
import { HostCharts } from './host-charts'
import { Reservations } from './reservations'

import { RootStateProps } from '../../store/store'
import { ReservationProps } from '../../interfaces/user-interface'

export function HostDashboard() {
    const loggedInUser = useSelector((storeState: RootStateProps) => storeState.userModule.loggedInUser)
    const [reservations, setReservations] = useState<ReservationProps[] | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (!loggedInUser) navigate('/')
        loadHostReservations()
    }, [])

    const loadHostReservations = async () => {
        if (!loggedInUser?.listingsId.length) return
        try {
            const hostReservations = await reservationService.getHostReservations(loggedInUser._id)
            setReservations(hostReservations)
        } catch (err) {
            // TODO:  ShowErrorMsg('Cannot load reservations, try again later')
            console.log('Failed to load host reservations with error:', err)
        }
    }

    const onChangeReservationStatus = async (reservation: ReservationProps, isApproved: boolean) => {
        if (!loggedInUser || !reservations) return
        try {
            const updatedStatus = isApproved ? 'approved' : 'rejected'
            const updatedReservation: ReservationProps = { ...reservation, status: updatedStatus }
            const updatedReservations: ReservationProps[] = reservations?.map(reservation =>
                reservation._id === updatedReservation._id ? updatedReservation : reservation
            )
            await reservationService.update(updatedReservation)
            setReservations(updatedReservations)
        } catch (err) {
            // TODO: showErrorMsg(err.txt)
        }
    }

    const listingsName = reservations?.reduce((acc: string[], reservation) => {
        if (!acc.includes(reservation.stayName)) acc.push(reservation.stayName)
        return acc
    }, []) || ['']

    return (
        <section className='main-layout host-dashboard'>
            <UserPageHeader loggedInUser={loggedInUser} />

            {!reservations?.length ? (
                <div>No Reservations</div>
            ) : (
                <>
                    <HostCharts
                        listingsName={listingsName}
                        hostChartData={stayService.getHostDashboardData(reservations)}
                    />
                    <Reservations
                        listingReservations={reservations}
                        onChangeReservationStatus={onChangeReservationStatus}
                    />
                </>
            )}
        </section>
    )
}
