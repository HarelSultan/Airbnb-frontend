import { useState, useRef } from 'react'

import { GiHamburgerMenu } from 'react-icons/gi'
import { FaUserCircle } from 'react-icons/fa'
import { useOnClickOutside } from '../hooks/use-on-click-outside'

export function UserMenu() {
    const [isUserToolTipOpen, setIsUserToolTipOpen] = useState<boolean>(false)

    const toolTipRef = useRef<HTMLDivElement | null>(null)

    const onToggleUserToolTipDisplay = () => {
        console.log('toggling')
        setIsUserToolTipOpen(prevState => !prevState)
    }

    const onCloseUserToolTip = () => {
        setIsUserToolTipOpen(false)
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
                    <button className='btn btn-login'>Log in</button>
                    <button className='btn btn-signup'>Sign up</button>
                    <div className='seperator'></div>
                    <button className='btn btn-airbnb'>Airbnb your home</button>
                </div>
            )}
        </div>
    )
}
