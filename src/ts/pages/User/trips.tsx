import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootStateProps } from '../../store/store'
import { useNavigate } from 'react-router-dom'
import { TripPreview } from './trip-preview'
import { NoTrips } from './no-trips'
import { UserPageHeader } from '../../cmps/user-page-header'
import { MobileHeader } from '../../cmps/mobile-header'
import { setUserTrips } from '../../store/user/user.action'

export function Trips() {
    const loggedInUser = useSelector((storeState: RootStateProps) => storeState.userModule.loggedInUser)
    const isMobile = useSelector((storeState: RootStateProps) => storeState.appModule.isMobile)
    const navigate = useNavigate()

    useEffect(() => {
        if (!loggedInUser) return navigate('/')
        if (!loggedInUser.trips || loggedInUser.trips.length !== loggedInUser.tripsId.length) loadUserTrips()
    }, [])

    const loadUserTrips = async () => {
        if (!loggedInUser || !loggedInUser.tripsId?.length) return
        try {
            await setUserTrips(loggedInUser)
        } catch (err) {
            // TODO: showErrorMsg('Cannot load your trips, try again later')
            console.log(err)
        }
    }

    const onTripDetails = (tripId: string) => {
        navigate(`/trips/${tripId}`)
    }

    const onSearchTrips = () => {
        navigate('/')
    }
    // if (!loggedInUser?.trips) return <div></div>
    return (
        <section className='main-layout trips'>
            {isMobile ? <MobileHeader /> : <UserPageHeader loggedInUser={loggedInUser} />}
            <h1>Trips</h1>
            <h2>Where you're going to stay</h2>
            {!loggedInUser?.trips?.length ? (
                <NoTrips isMobile={isMobile} onSearchTrips={onSearchTrips} />
            ) : (
                <div className='trips-stays-wrapper'>
                    {loggedInUser.trips.map((trip, idx) => (
                        <div onClick={() => onTripDetails(trip._id)} key={`${trip._id}${idx}`} className='trip-wrapper'>
                            <TripPreview trip={trip} />
                        </div>
                    ))}
                </div>
            )}
        </section>
    )
}
