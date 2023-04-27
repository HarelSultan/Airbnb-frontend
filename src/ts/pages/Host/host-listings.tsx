import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootStateProps } from '../../store/store'
import { AppLogo } from '../../cmps/AppHeader/Logo/logo'
import { StayListingCard } from '../Booking/cmps/stay-listing-card'
import { StayProps } from '../../interfaces/stay-interface'
import { loadStays } from '../../store/stay/stay.action'
import { stayService } from '../../services/stay.service'

export function HostListings() {
    const loggedInUser = useSelector((storeState: RootStateProps) => storeState.userModule.loggedInUser)

    const stays: StayProps[] = useSelector((storeState: RootStateProps) => storeState.stayModule.stays)
    const staysToDisplay = stays.slice(0, 8)

    useEffect(() => {
        onLoadHostStays()
    }, [])

    const onLoadHostStays = () => {
        try {
            loadStays(stayService.getDeafultSearchProps(), stayService.getDefaultFilterProps())
        } catch (err) {
            // Show error msg
            console.log('Getting stays failed with error:', err)
        }
    }

    return (
        <section className='main-layout host-listings'>
            <header className='full host-header'>
                <AppLogo />
            </header>
            <h1>Welcome back, {loggedInUser?.fullName}</h1>
            <h2>Your Listings</h2>
            <div className='listings-wrapper'>
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
