import { useState, useRef } from 'react'

import { GiHamburgerMenu } from 'react-icons/gi'
import { FaUserCircle } from 'react-icons/fa'
import { useOnClickOutside } from '../hooks/use-on-click-outside'
import { UserProps } from '../interfaces/user-interface'
import { logout } from '../store/user/user.action'

interface Props {
    onToggleLoginSignup?: (isSignup: boolean) => void
    loggedInUser: UserProps | null
}

export function UserMenu({ onToggleLoginSignup, loggedInUser }: Props) {
    const [isUserToolTipOpen, setIsUserToolTipOpen] = useState<boolean>(false)

    const toolTipRef = useRef<HTMLDivElement | null>(null)

    const onToggleUserToolTipDisplay = () => {
        console.log('toggling')
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
                <FaUserCircle />
            </div>
            {isUserToolTipOpen && (
                <div className='user-tool-tip'>
                    {loggedInUser ? (
                        <button onClick={logout} className='btn btn-logout'>
                            Log out
                        </button>
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
                    <button className='btn btn-airbnb'>Airbnb your home</button>
                </div>
            )}
        </div>
    )
}
