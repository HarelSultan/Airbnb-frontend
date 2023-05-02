import { useEffect, useRef, useState } from 'react'
import { utilService } from '../../services/util.service'
import { AppLogo } from '../../cmps/AppHeader/Logo/logo'
import { ReservationProps } from '../../interfaces/user-interface'

interface Props {
    listingReservations: ReservationProps[]
    onChangeReservationStatus: (reservation: ReservationProps, isApproved: boolean) => void
}

export function Reservations({ listingReservations, onChangeReservationStatus }: Props) {
    const [isTableScrolled, setIsTableScrolled] = useState<boolean>(false)

    const tableContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleScroll() {
            if (!tableContainerRef.current) return
            const isScrolled: boolean = tableContainerRef.current.scrollLeft > 0
            setIsTableScrolled(isScrolled)
        }

        tableContainerRef.current && tableContainerRef.current.addEventListener('scroll', handleScroll)

        return () => {
            tableContainerRef.current && tableContainerRef.current.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric',
        })
    }

    return (
        <section className='reservations'>
            <div className='reservations-header'>
                <h2>{utilService.formatPlural(listingReservations.length, ' reservation')}</h2>
            </div>
            <div ref={tableContainerRef} className={`table-container ${isTableScrolled ? 'scrolled' : ''}`}>
                <table border={0} cellSpacing={0} cellPadding={0}>
                    <thead>
                        <tr className='table-header'>
                            <th className='guest guest-header'>Guest</th>
                            <th className='date date-header'>Check-in</th>
                            <th className='date date-header'>Check-out</th>
                            <th className='date date-header'>Booked</th>
                            <th className='listing listing-header'>Listing</th>
                            <th className='total-payout total-payout-header'>Total Payout</th>
                            <th className='status status-header'>Status</th>
                            <th className='actions actions-header'>To do</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listingReservations.map(reservation => (
                            <tr key={reservation._id}>
                                <td className='guest guest-desc'>
                                    <p>{utilService.getFirstName(reservation.guestName)}</p>
                                </td>
                                <td className='date date-desc'>{formatDate(reservation.reservationDates.checkIn)}</td>
                                <td className='date date-desc'>{formatDate(reservation.reservationDates.checkOut)}</td>
                                <td className='date date-desc'>{formatDate(reservation.bookedAt)}</td>
                                <td className='listing listing-desc'>
                                    <p>{reservation.stayName}</p>
                                </td>
                                <td className='total-payout total-payout-desc'>{reservation.totalPayout}</td>
                                <td className='status status-desc'>{reservation.status}</td>
                                <td className='actions actions-desc'>
                                    <div
                                        className={`actions-wrapper ${
                                            reservation.status === 'pending' ? '' : 'disabled'
                                        }`}
                                    >
                                        <button
                                            onClick={() => onChangeReservationStatus(reservation, true)}
                                            className='btn btn-success'
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => onChangeReservationStatus(reservation, false)}
                                            className='btn btn-danger'
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}
