import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootStateProps } from '../../store/store'
import { StayListingCard } from '../Booking/cmps/stay-listing-card'
import { useNavigate } from 'react-router-dom'
import { setUserTripsStays } from '../../store/user/user.action'

export function Trips() {
    const loggedInUser = useSelector((storeState: RootStateProps) => storeState.userModule.loggedInUser)

    const navigate = useNavigate()

    useEffect(() => {
        if (!loggedInUser) navigate('/')
        if (!loggedInUser?.tripsStays || loggedInUser.tripsStays.length < loggedInUser.trips.length) onLoadUserTrips()
    }, [])

    const onLoadUserTrips = () => {
        try {
            loggedInUser && setUserTripsStays(loggedInUser)
        } catch (err) {
            // Show error msg
            console.log('Getting stays failed with error:', err)
        }
    }

    if (!loggedInUser?.trips) return <div>No trips</div>
    if (!loggedInUser?.tripsStays) return <div>Skeleton</div>

    return (
        <section className='main-layout trips'>
            <div className='trips-stays-wrapper'>
                {loggedInUser.tripsStays.map((stay, idx) => (
                    <div key={`${stay._id}${idx}`} className='listing-wrapper'>
                        <StayListingCard stay={stay} isPriceDisplayed={true} />
                    </div>
                ))}
            </div>
        </section>
    )
}
