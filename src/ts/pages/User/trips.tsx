import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootStateProps } from '../../store/store'
import { useNavigate } from 'react-router-dom'
import { setUserTripsStays } from '../../store/user/user.action'
import { AppLogo } from '../../cmps/AppHeader/Logo/logo'
import { TripPreview } from './trip-preview'
import { NoTrips } from './no-trips'

export function Trips() {
    const loggedInUser = useSelector((storeState: RootStateProps) => storeState.userModule.loggedInUser)
    const isMobile = useSelector((storeState: RootStateProps) => storeState.appModule.isMobile)
    const navigate = useNavigate()

    useEffect(() => {
        if (!loggedInUser) navigate('/')
    }, [])

    const onLoadUserTrips = () => {
        try {
            loggedInUser && setUserTripsStays(loggedInUser)
        } catch (err) {
            // Show error msg
            console.log('Getting stays failed with error:', err)
        }
    }

    const onTripDetails = () => {}

    const onSearchTrips = () => {
        navigate('/')
    }

    return (
        <section className='main-layout trips'>
            {!isMobile && (
                <header className='full header'>
                    <AppLogo />
                </header>
            )}
            <h1>Trips</h1>
            <h2>Where you're going to stay</h2>
            {!loggedInUser?.trips.length ? (
                <NoTrips isMobile={isMobile} onSearchTrips={onSearchTrips} />
            ) : (
                <div className='trips-stays-wrapper'>
                    {loggedInUser.trips.map((trip, idx) => (
                        <div key={`${trip._id}${idx}`} className='listing-wrapper'>
                            <TripPreview trip={trip} />
                        </div>
                    ))}
                </div>
            )}
        </section>
    )
}
