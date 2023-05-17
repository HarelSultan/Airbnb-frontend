import { useState, useRef } from 'react'

import { GiHamburgerMenu } from 'react-icons/gi'
import { FaUserCircle } from 'react-icons/fa'
import { useOnClickOutside } from '../hooks/use-on-click-outside'
import { UserProps } from '../interfaces/user-interface'
import { NavigateFunction } from 'react-router-dom'

interface Props {
    onToggleLoginSignup?: (isSignup: boolean) => void
    loggedInUser: UserProps | null
    onBecomeHost: () => void
    navigate: NavigateFunction
    onLogout: () => void
}

export function UserMenu({ onToggleLoginSignup, loggedInUser, onBecomeHost, navigate, onLogout }: Props) {
    const [isUserToolTipOpen, setIsUserToolTipOpen] = useState<boolean>(false)

    const toolTipRef = useRef<HTMLDivElement | null>(null)

    const onToggleUserToolTipDisplay = () => {
        setIsUserToolTipOpen(prevState => !prevState)
    }

    const onCloseUserToolTip = () => {
        setIsUserToolTipOpen(false)
    }

    const onOpenLoginSignup = (isSignup: boolean) => {
        if (!onToggleLoginSignup) return
        onToggleLoginSignup(isSignup)
    }

    useOnClickOutside(toolTipRef, onCloseUserToolTip)

    return (
        <div ref={toolTipRef} onClick={onToggleUserToolTipDisplay} className='user-menu'>
            <div className='hamburger-wrapper'>
                <GiHamburgerMenu />
            </div>
            <div className='user-wrapper'>
                {loggedInUser?.imgUrl ? <img src={loggedInUser.imgUrl} alt='User Img' /> : <FaUserCircle />}
            </div>
            {isUserToolTipOpen && (
                <div className='user-tool-tip'>
                    {loggedInUser ? (
                        <>
                            <div className='host-menu-wrapper'>
                                <button onClick={() => navigate('/trips')} className='btn btn-trips'>
                                    Trips
                                </button>
                                <button onClick={() => navigate('/wishlist')} className='btn btn-wish-list'>
                                    Wishlists
                                </button>
                                {loggedInUser.listingsId && (
                                    <>
                                        <div className='seperator'></div>

                                        <button onClick={() => navigate('/host/listings')} className='btn btn-listings'>
                                            Listings
                                        </button>
                                        <button
                                            onClick={() => navigate('/host/dashboard')}
                                            className='btn btn-dashboard'
                                        >
                                            Dashboard
                                        </button>
                                    </>
                                )}
                            </div>
                            <button onClick={onLogout} className='btn btn-logout'>
                                Log out
                            </button>
                        </>
                    ) : (
                        <>
                            <button onClick={() => onOpenLoginSignup(false)} className='btn btn-login'>
                                Log in
                            </button>
                            <button onClick={() => onOpenLoginSignup(true)} className='btn btn-signup'>
                                Sign up
                            </button>
                        </>
                    )}
                    <div className='seperator'></div>
                    <button onClick={onBecomeHost} className='btn btn-airbnb'>
                        Airbnb your home
                    </button>
                </div>
            )}
        </div>
    )
}
