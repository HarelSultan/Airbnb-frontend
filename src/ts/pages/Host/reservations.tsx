import { useEffect, useRef, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { utilService } from '../../services/util.service'
import { AppLogo } from '../../cmps/AppHeader/Logo/logo'

export function Reservations() {
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

    return (
        <section className='main-layout reservations'>
            <header className='full host-header'>
                <AppLogo />
            </header>
            <div className='reservations-header'>
                <h2>2 reservations</h2>
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
                        <tr>
                            <td className='guest guest-desc'>
                                <p>{utilService.getFirstName('Moshe Cohen')}</p>
                            </td>
                            <td className='date date-desc'>21/2/2023</td>
                            <td className='date date-desc'>25/2/2023</td>
                            <td className='date date-desc'>18/2/2023</td>
                            <td className='listing listing-desc'>
                                <p> Grand apartment sagarada familia</p>
                            </td>
                            <td className='total-payout total-payout-desc'>$1023</td>
                            <td className='status status-desc'>Pending</td>
                            <td className='actions actions-desc'>
                                <div className='actions-wrapper'>
                                    <button className='btn btn-success'>Approve</button>
                                    <button className='btn btn-danger'>Reject</button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className='guest guest-desc'>
                                <p>{utilService.getFirstName('Avi Ben Zikieor')}</p>
                            </td>
                            <td className='date date-desc'>1/2/2023</td>
                            <td className='date date-desc'>5/2/2023</td>
                            <td className='date date-desc'>18/12/2023</td>
                            <td className='listing listing-desc'>
                                <p> Grand</p>
                            </td>
                            <td className='total-payout total-payout-desc'>$10023</td>
                            <td className='status status-desc'>Approved</td>
                            <td className='actions actions-desc'>
                                <div className='actions-wrapper'>
                                    <button className='btn btn-success'>Approve</button>
                                    <button className='btn btn-danger'>Reject</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    )
}
