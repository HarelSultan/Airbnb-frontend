import { useState, useEffect, useRef } from 'react'

import { GiHamburgerMenu } from 'react-icons/gi'
import { FaUserCircle } from 'react-icons/fa'
import { useOnClickOutside } from '../hooks/use-on-click-outside'

interface Props {
    isSearchOpen: boolean
    setSelectedSearchModule: (searchModule: string) => void
}

export function UserMenu({ isSearchOpen, setSelectedSearchModule }: Props) {
    const [isUserToolTipOpen, setIsUserToolTipOpen] = useState<boolean>(false)

    const toolTipRef = useRef(null)

    // useEffect(() => {
    //     isSearchOpen && setIsUserToolTipOpen(false)
    // }, [isSearchOpen])

    const onToggleUserToolTipDisplay = () => {
        console.log('toggling')
        setIsUserToolTipOpen(prevState => !prevState)
    }

    useOnClickOutside(toolTipRef, onToggleUserToolTipDisplay)

    return (
        <div onClick={onToggleUserToolTipDisplay} className='user-menu'>
            <div className='hamburger-wrapper'>
                <GiHamburgerMenu />
            </div>
            <div className='user-wrapper'>
                <FaUserCircle />
            </div>
            {isUserToolTipOpen && (
                <div className='user-tool-tip' ref={toolTipRef}>
                    <button className='btn btn-login'>Log in</button>
                    <button className='btn btn-signup'>Sign up</button>
                    <div className='seperator'></div>
                    <button className='btn btn-airbnb'>Airbnb your home</button>
                </div>
            )}
        </div>
    )
}
