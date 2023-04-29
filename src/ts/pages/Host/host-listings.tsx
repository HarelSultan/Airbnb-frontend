import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { RootStateProps } from '../../store/store'
import { AppLogo } from '../../cmps/AppHeader/Logo/logo'
import { StayProps } from '../../interfaces/stay-interface'
import { stayService } from '../../services/stay.service'
import { AiOutlinePlus } from 'react-icons/ai'
import { IoIosSearch } from 'react-icons/io'
import { utilService } from '../../services/util.service'
import { FiEdit2 } from 'react-icons/fi'

export function HostListings() {
    const [isTableScrolled, setIsTableScrolled] = useState<boolean>(false)

    const loggedInUser = useSelector((storeState: RootStateProps) => storeState.userModule.loggedInUser)
    const isMobile = useSelector((storeState: RootStateProps) => storeState.appModule.isMobile)

    // TODO: Create mobile-layout showing only listing and update
    // TODO: add user.action: adding his stays to loggedInUser object
    // TODO: Allow filtering and sorting

    // TODO: Make skeleton stays, show msg if doesn't have any listing.
    const [staysToDisplay, setStaysToDisplay] = useState<StayProps[] | null>(null)

    const tableContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
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
        console.log('loading host')
        if (!loggedInUser) return console.log('loggedinUser', loggedInUser)

        try {
            const hostListings: StayProps[] = await stayService.getHostListings(loggedInUser)
            setStaysToDisplay(hostListings)
        } catch (err) {
            // Show error msg
            console.log('Getting stays failed with error:', err)
        }
    }

    const getListingStatus = (stay: StayProps) => {
        // TODO: check if listing is currently avaliable/reserved
        return 'Avaliable'
    }

    const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        if (!staysToDisplay) return
        const searchBy: string = ev.target.value
        const updatedStays: StayProps[] = staysToDisplay.filter(stay => stay.name.includes(searchBy))
        setStaysToDisplay(updatedStays)
    }

    if (!staysToDisplay) return <div>Add stay</div>

    return (
        <section className='main-layout host-listings'>
            <header className='full host-header'>
                <AppLogo />
            </header>
            <div className='listing-header'>
                <h2>{utilService.formatPlural(staysToDisplay.length, ' listing')}</h2>
                <button title='Create listing' className='btn btn-create'>
                    <AiOutlinePlus />
                    Create listing
                </button>
            </div>
            <div className='search-listing-wrapper'>
                <IoIosSearch />

                <input type='text' onChange={handleChange} placeholder='Search listings' />
            </div>
            {/* <div className='listings-wrapper'>
                {staysToDisplay.map(stay => (
                    <div key={stay._id} className='listing-wrapper'>
                        <StayListingCard stay={stay} isPriceDisplayed={true} />
                        <div className='actions-wrapper'>
                            <button className='btn btn-preview'>Preview</button>
                            <button className='btn btn-save'>Edit</button>
                            <button className='btn btn-delete'>Delete</button>
                        </div>
                    </div>
                ))}
            </div> */}
            {isMobile ? (
                <table cellSpacing={0}>
                    <thead>
                        <tr className='table-header'>
                            <th className='listing listing-header'>listing</th>
                            <th className='actions actions-header'>to-do</th>
                        </tr>
                    </thead>
                    <tbody>
                        {staysToDisplay.map(stay => (
                            <tr key={stay._id}>
                                <td className='listing listing-data'>
                                    <img src={stay.imgUrls[1]} alt={stay.imgUrls[0]} />
                                    <h3 title={stay.name} className='listing-name'>
                                        {stay.name}
                                    </h3>
                                </td>
                                <td className='actions'>
                                    <button title='Edit' className='btn btn-update'>
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
                                <th className='listing listing-header'>listing</th>
                                <th className='status status-header'>status</th>
                                <th className='actions actions-header'>to-do</th>
                                <th className='bedrooms bedrooms-header'>bedrooms</th>
                                <th className='beds beds-header'>beds</th>
                                <th className='baths baths-header'>baths</th>
                                <th className='price price-header'>price</th>
                                <th className='location location-header'>location</th>
                            </tr>
                        </thead>
                        <tbody>
                            {staysToDisplay.map(stay => (
                                <tr key={stay._id}>
                                    <td className='listing listing-data'>
                                        <img src={stay.imgUrls[1]} alt={stay.imgUrls[0]} />
                                        <h3 title={stay.name} className='listing-name'>
                                            {stay.name}
                                        </h3>
                                    </td>
                                    <td className='status'>{getListingStatus(stay)}</td>
                                    <td className='actions'>
                                        <button className='btn btn-update'>Update</button>
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
