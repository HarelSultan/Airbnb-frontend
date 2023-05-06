import { Routes, Route } from 'react-router-dom'
import { HomePage } from './ts/pages/Home/home-page'
import { StayPage } from './ts/pages/Stay/stay-page'
import './assets/style/main.scss'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootStateProps } from './ts/store/store'
import { MOBILE_MAX_WIDTH } from './ts/store/app/app.reducer'
import { setIsMobile } from './ts/store/app/app.action'
import { BookingPage } from './ts/pages/Booking/booking-page'
import { EditStay } from './ts/pages/Host/edit-stay'
import { HostListings } from './ts/pages/Host/host-listings'
import { HostDashboard } from './ts/pages/Host/host-dashboard'
import { WishList } from './ts/pages/User/wish-list'
import { Trips } from './ts/pages/User/trips'
import { TripDetails } from './ts/pages/User/trip-details'

function App() {
    const isMobile = useSelector((storeState: RootStateProps) => storeState.appModule.isMobile)
    useEffect(() => {
        function handleResize() {
            const updatedIsMobile = window.innerWidth < MOBILE_MAX_WIDTH
            if (updatedIsMobile === isMobile) return
            setIsMobile(updatedIsMobile)
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [isMobile])

    return (
        <div className='App'>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/stay/:stayId' element={<StayPage />} />
                <Route path='/book/:stayId' element={<BookingPage />} />
                <Route path='/wishlist' element={<WishList />} />
                <Route path='/trips' element={<Trips />} />
                <Route path='/trips/:tripId' element={<TripDetails />} />
                <Route path='/host/listings' element={<HostListings />} />
                <Route path='/host/dashboard' element={<HostDashboard />} />
                <Route path='/host/edit' element={<EditStay />} />
                <Route path='/host/edit/:stayId' element={<EditStay />} />
            </Routes>
        </div>
    )
}

export default App
