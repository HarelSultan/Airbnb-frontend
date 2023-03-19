import { GiHamburgerMenu } from 'react-icons/gi'
import { FaUserCircle } from 'react-icons/fa'

export function UserMenu() {
    return (
        <button className='btn user-menu'>
            <div className='hamburger-wrapper'>
                <GiHamburgerMenu />
            </div>
            <div className='user-wrapper'>
                <FaUserCircle />
            </div>
        </button>
    )
}
