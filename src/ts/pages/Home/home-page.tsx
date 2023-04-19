import { useState, useEffect, ErrorInfo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { StayProps } from '../../interfaces/stay-interface'
import { RootStateProps } from '../../store/store'

import { AppHeader } from '../../cmps/AppHeader/app-header'
import { Filter } from './cmps/filter'
import { StayList } from './cmps/stay-list'
import { loadStays } from '../../store/stay/stay.action'
import { stayService } from '../../services/stay.service'
import { SearchByProps } from '../../interfaces/search-by-interface'
import { AppFooter } from '../../cmps/app-footer'
import { StayMapList } from './cmps/Filter/stay-map-list'
import { Modal } from '../../cmps/modal'
import { LoginSignup } from '../../cmps/login-signup'
import { updateWishList } from '../../store/user/user.action'

export interface LoginSignupDisplayProps {
    isOpen: boolean
    isSignup: boolean
}

export function HomePage() {
    const [isMapOpen, setIsMapOpen] = useState<boolean>(false)
    const [loginSignupDisplay, setLoginSignupDisplay] = useState<LoginSignupDisplayProps>({
        isOpen: false,
        isSignup: false,
    })

    const stays: StayProps[] = useSelector((storeState: RootStateProps) => storeState.stayModule.stays)
    const isMobile: boolean = useSelector((storeState: RootStateProps) => storeState.appModule.isMobile)
    const filterBy = useSelector((storeState: RootStateProps) => storeState.stayModule.filterBy)
    const loggedInUser = useSelector((storeState: RootStateProps) => storeState.userModule.loggedInUser)
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search)
        const searchBy = stayService.getParamsSearchBy(searchParams)
        onLoadStays(searchBy)
    }, [filterBy, location.search])

    const onLoadStays = (searchBy: SearchByProps) => {
        try {
            loadStays(searchBy, filterBy)
        } catch (err) {
            // Show error msg
            console.log('Getting stays failed with error:', err)
        }
    }

    const onToggleMapDisplay = () => {
        setIsMapOpen(prevState => !prevState)
    }

    const onSaveStay = async (ev: React.MouseEvent<HTMLButtonElement>, stay: StayProps) => {
        ev.stopPropagation()
        if (!loggedInUser) return onToggleLoginSignup()
        try {
            updateWishList(loggedInUser, stay._id)
            // TODO: ShowSucessMsg(`${stay.name saved to wish list.}`)
        } catch (err: any) {
            // TODO: ShowErrorMsg(err.msg)
            console.log(err.msg)
        }
    }

    const onToggleLoginSignup = (isSignup: boolean = false) => {
        console.log(loginSignupDisplay)
        setLoginSignupDisplay(prevState => ({ isOpen: !prevState.isOpen, isSignup }))
    }

    const onStayDetails = (stay: StayProps) => {
        const searchParams = new URLSearchParams(location.search)
        searchParams.set('checkIn', stay.randomAvaliableDates.checkIn.toString().slice(0, 10))
        searchParams.set('checkOut', stay.randomAvaliableDates.checkOut.toString().slice(0, 10))
        if (!searchParams.get('adults')) searchParams.set('adults', '1')
        navigate(`/stay/${stay._id}?${searchParams}`)
    }

    const stayListProps = {
        stays,
        onStayDetails,
        onSaveStay,
        wishList: loggedInUser?.stayWishList || [''],
    }

    const loginSignupModalProps = {
        className: 'login-signup-modal',
        onCloseModal: onToggleLoginSignup,
        headerTxt: 'Welcome to Airbnb',
        children: <LoginSignup isSignningUp={loginSignupDisplay.isSignup} onLoginSignupCB={onToggleLoginSignup} />,
    }

    return (
        <section className={`main-layout home-page ${isMapOpen ? 'map-open' : ''}`}>
            <AppHeader isMobile={isMobile} onToggleLoginSignup={onToggleLoginSignup} loggedInUser={loggedInUser} />
            <Filter isMobile={isMobile} />
            {isMapOpen ? <StayMapList {...stayListProps} /> : <StayList {...stayListProps} />}
            <button onClick={onToggleMapDisplay} className='btn btn-toggle-map'>
                {isMapOpen ? (
                    <div>
                        <span>Show list</span>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 16 16'
                            aria-hidden='true'
                            role='presentation'
                            focusable='false'
                        >
                            <path
                                fill-rule='evenodd'
                                d='M2.5 11.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM15 12v2H6v-2h9zM2.5 6.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM15 7v2H6V7h9zM2.5 1.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM15 2v2H6V2h9z'
                            ></path>
                        </svg>
                    </div>
                ) : (
                    <div>
                        <span>Show map</span>
                        <svg
                            viewBox='0 0 32 32'
                            xmlns='http://www.w3.org/2000/svg'
                            aria-hidden='true'
                            role='presentation'
                            focusable='false'
                        >
                            <path d='M31.245 3.747a2.285 2.285 0 0 0-1.01-1.44A2.286 2.286 0 0 0 28.501 2l-7.515 1.67-10-2L2.5 3.557A2.286 2.286 0 0 0 .7 5.802v21.95a2.284 2.284 0 0 0 1.065 1.941A2.29 2.29 0 0 0 3.498 30l7.515-1.67 10 2 8.484-1.886a2.285 2.285 0 0 0 1.802-2.245V4.247a2.3 2.3 0 0 0-.055-.5zM12.5 25.975l-1.514-.303L9.508 26H9.5V4.665l1.514-.336 1.486.297v21.349zm10 1.36l-1.515.337-1.485-.297V6.025l1.514.304L22.493 6h.007v21.335z'></path>
                        </svg>
                    </div>
                )}
            </button>
            {loginSignupDisplay.isOpen && !loggedInUser && <Modal {...loginSignupModalProps} />}
            {!isMapOpen && <AppFooter />}
        </section>
    )
}
