import { Link } from 'react-router-dom'
import { SearchTeaser } from '../search-teaser'
import { UserMenu } from '../user-menu'
import { AppLogo } from './Logo/logo'

export function AppHeader() {
    return (
        <header className='main-layout full app-header'>
            <nav className='app-nav'>
                <AppLogo />
                <SearchTeaser />
                <Link to='./'>Airbnb your home</Link>
                <UserMenu />
            </nav>
        </header>
    )
}
