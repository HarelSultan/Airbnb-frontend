import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { RootStateProps } from '../../store/store'
import { StayProps } from '../../interfaces/stay-interface'
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai'
import { IoIosSearch } from 'react-icons/io'
import { utilService } from '../../services/util.service'
import { FiEdit2 } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { setUserListings } from '../../store/user/user.action'
import { UserPageHeader } from '../../cmps/user-page-header'

// TODO: Create mobile-layout showing only listing and update
// TODO: add user.action: adding his stays to loggedInUser object
// TODO: Allow filtering and sorting
// TODO: Make skeleton stays, show msg if doesn't have any listing.

export function HostListings() {
    const [isTableScrolled, setIsTableScrolled] = useState<boolean>(false)
    const [staysToDisplay, setStaysToDisplay] = useState<StayProps[] | null>(null)
    const [searchListingsBy, setSearchListingsBy] = useState<string>('')

    const loggedInUser = useSelector((storeState: RootStateProps) => storeState.userModule.loggedInUser)
    const isMobile = useSelector((storeState: RootStateProps) => storeState.appModule.isMobile)

    const navigate = useNavigate()
    const tableContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // loggedInUser?.listings ? setStaysToDisplay(loggedInUser.listings) : onLoadHostStays()
        onLoadHostStays()
        // if (isMobile) return
        function handleScroll() {
            if (!tableContainerRef.current) return
            console.log('in')
            const isScrolled: boolean = tableContainerRef.current.scrollLeft > 0
            setIsTableScrolled(isScrolled)
        }
        console.log(tableContainerRef)
        tableContainerRef.current && tableContainerRef.current.addEventListener('scroll', handleScroll)

        return () => {
            tableContainerRef.current && tableContainerRef.current.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const onLoadHostStays = async () => {
        if (!loggedInUser) return navigate('/')

        if (loggedInUser.listings?.length && loggedInUser.listings.length === loggedInUser.listingsId.length) {
            return setStaysToDisplay(loggedInUser.listings)
        }
        try {
            const hostListing: StayProps[] = await setUserListings(loggedInUser)
            console.log(hostListing)
            setStaysToDisplay(hostListing)
        } catch (err) {
            // Show error msg
            console.log('Getting stays failed with error:', err)
        }
    }

    const onUpdateListing = (ev: React.MouseEvent<HTMLButtonElement>, stayId: string) => {
        ev.stopPropagation()
        navigate(`/host/edit/${stayId}`)
    }

    const getListingStatus = (stay: StayProps) => {
        // TODO: check if listing is currently avaliable/reserved
        const currDate = Date.now()
        const isOccupied = stay.reservations.some(reservation => {
            if (
                currDate > new Date(reservation.dates.checkIn).getTime() &&
                currDate < new Date(reservation.dates.checkOut).getTime()
            )
                return true
            return false
        })
        return isOccupied ? 'Occupied' : 'Avaliable'
    }

    const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        onSetSearchListingsBy(ev.target.value.toLowerCase())
    }

    const onSetSearchListingsBy = (searchBy: string) => {
        if (!loggedInUser?.listings) return

        setSearchListingsBy(searchBy)
        const updatedStays: StayProps[] = searchBy
            ? loggedInUser.listings.filter(stay => stay.name.toLowerCase().includes(searchBy))
            : loggedInUser.listings
        setStaysToDisplay(updatedStays)
    }

    if (!staysToDisplay) return <div>Add stay</div>

    return (
        <section className='main-layout host-listings'>
            <UserPageHeader loggedInUser={loggedInUser} />

            <div className='listing-header'>
                <h2>{utilService.formatPlural(staysToDisplay.length, ' listing')}</h2>
                <button onClick={() => navigate('/host/edit')} title='Create listing' className='btn btn-create'>
                    <AiOutlinePlus />
                    Create listing
                </button>
            </div>

            <label className='search-listing-wrapper'>
                <IoIosSearch className='search-icon' />
                <input type='text' value={searchListingsBy} onChange={handleChange} placeholder='Search listings' />
                {searchListingsBy && (
                    <button onClick={() => onSetSearchListingsBy('')} className='btn btn-clear'>
                        <AiOutlineClose />
                    </button>
                )}
            </label>

            {isMobile ? (
                <table cellSpacing={0}>
                    <thead>
                        <tr className='table-header'>
                            <th>listing</th>
                            <th>to-do</th>
                        </tr>
                    </thead>
                    <tbody>
                        {staysToDisplay.map(stay => (
                            <tr onClick={() => navigate(`/stay/${stay._id}`)} key={stay._id}>
                                <td className='listing listing-data'>
                                    <img src={stay.imgUrls[1]} alt={stay.imgUrls[0]} />
                                    <h3 title={stay.name} className='listing-name'>
                                        {stay.name}
                                    </h3>
                                </td>
                                <td className='actions'>
                                    <button
                                        onClick={ev => onUpdateListing(ev, stay._id)}
                                        title='Edit'
                                        className='btn btn-update'
                                    >
                                        <FiEdit2 />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div ref={tableContainerRef} className={`table-container ${isTableScrolled ? 'scrolled' : ''}`}>
                    <table cellSpacing={0}>
                        <thead>
                            <tr className='table-header'>
                                <th>listing</th>
                                <th>status</th>
                                <th>to-do</th>
                                <th>bedrooms</th>
                                <th>beds</th>
                                <th>baths</th>
                                <th>price</th>
                                <th>location</th>
                            </tr>
                        </thead>
                        <tbody>
                            {staysToDisplay.map(stay => (
                                <tr onClick={() => navigate(`/stay/${stay._id}`)} key={stay._id}>
                                    <td className='listing listing-data'>
                                        <img src={stay.imgUrls[1]} alt={stay.imgUrls[0]} />
                                        <h3 title={stay.name} className='listing-name'>
                                            {stay.name}
                                        </h3>
                                    </td>
                                    <td className='status'>{getListingStatus(stay)}</td>
                                    <td className='actions'>
                                        <button
                                            onClick={ev => onUpdateListing(ev, stay._id)}
                                            className='btn btn-update'
                                        >
                                            Update
                                        </button>
                                    </td>
                                    <td className='bedrooms'>{stay.stayDetails.bedrooms}</td>
                                    <td className='beds'>{stay.stayDetails.beds}</td>
                                    <td className='baths'>{stay.stayDetails.bathrooms}</td>
                                    <td className='price'>{stay.price}</td>
                                    <td className='location'>
                                        <p className='listing-location'>{stay.loc.city}</p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    )
}
