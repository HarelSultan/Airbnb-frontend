import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { RootStateProps } from '../../store/store'
import { AppLogo } from '../../cmps/AppHeader/Logo/logo'
import { StayListingCard } from '../Booking/cmps/stay-listing-card'
import { StayProps } from '../../interfaces/stay-interface'
import { loadStays } from '../../store/stay/stay.action'
import { stayService } from '../../services/stay.service'
import { AiOutlinePlus } from 'react-icons/ai'
import { FaSearch } from 'react-icons/fa'

export function HostListings() {
    const [isTableScrolled, setIsTableScrolled] = useState<boolean>(false)

    const loggedInUser = useSelector((storeState: RootStateProps) => storeState.userModule.loggedInUser)
    const stays: StayProps[] = useSelector((storeState: RootStateProps) => storeState.stayModule.stays)

    // TODO: Load host stays
    // TODO: Make skeleton stays, show msg if doesn't have any listing.
    const [staysToDisplay, setStaysToDisplay] = useState<StayProps[] | null>(null)

    const tableContainerRef = useRef(null)

    useEffect(() => {
        onLoadHostStays()
    }, [])

    const onLoadHostStays = async () => {
        try {
            await loadStays(stayService.getDeafultSearchProps(), stayService.getDefaultFilterProps())
            setStaysToDisplay(stays.slice(0, 8))
        } catch (err) {
            // Show error msg
            console.log('Getting stays failed with error:', err)
        }
    }

    const getListingStatus = (stay: StayProps) => {
        // TODO: check if listing is currently avaliable/reserved
        return 'Avaliable'
    }

    console.log(staysToDisplay)
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
            <h1>Welcome back, {loggedInUser?.fullName}</h1>
            <div className='listing-header'>
                <h2>Your Listings</h2>
                <button title='Create listing' className='btn btn-create'>
                    <AiOutlinePlus />
                    Create listing
                </button>
            </div>
            <div className='search-listing-wrapper'>
                <FaSearch />
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
            <div ref={tableContainerRef} className={`table-container ${isTableScrolled ? 'scrolled' : ''}`}>
                <table border={0} cellSpacing={0} cellPadding={0}>
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
                            <tr>
                                <td className='listing'>
                                    <img src={stay.imgUrls[0]} alt={stay.imgUrls[1]} />
                                    <h3>{stay.name}</h3>
                                </td>
                                <td className='status'>{getListingStatus(stay)}</td>
                                <td className='actions'>
                                    <div className='actions-wrapper'>
                                        <button className='btn btn-save'>Edit</button>
                                        <button className='btn btn-delete'>Delete</button>
                                    </div>
                                </td>
                                <td className='bedrooms'>{stay.stayDetails.bedrooms}</td>
                                <td className='beds'>{stay.stayDetails.beds}</td>
                                <td className='baths'>{stay.stayDetails.bathrooms}</td>
                                <td className='price'>{stay.price}</td>
                                <td className='location'>
                                    <p>
                                        {stay.loc.city}
                                        {stay.loc.countryCode}
                                    </p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}

{
    /* <div className='listings-wrapper'>
    <div className='listing-header'>
        <h3>Listing</h3>
        <h3>Capacity</h3>
        <h3>Rooms</h3>
        <h3>Price</h3>
        <h3>Actions</h3>
    </div>
    <div className='listing-wrapper'>
        <div className='stay-info-wrapper'>
            <img
                src='http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436937/mkbcjfockxezgrvimska.jpg'
                alt=''
            />
            <h4> Moshe's house</h4>
        </div>
        <h4 className='listing-capcity'>4</h4>
        <h4 className='listing-rooms'>2</h4>
        <h4 className='listing-price'>$125</h4>
        <div className='listing-actions'>
            <button className='btn btn save'>Edit</button>
            <button className='btn btn-delete'>Delete</button>
        </div>
    </div>
</div> */
}
