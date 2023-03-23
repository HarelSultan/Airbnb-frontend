import { Link } from 'react-router-dom'
import { SearchTeaser } from '../search-teaser'
import { UserMenu } from '../user-menu'
import { AppLogo } from './Logo/logo'
import { useState } from 'react'
import { SearchForm } from './cmps/search-form'
import { stayService } from '../../services/stay.service'
import { SearchByProps } from '../../interfaces/search-by-interface'

export function AppHeader() {
    const [isSearchOpen, setIsSearchOpen] = useState<Boolean>(false)
    const [searchBy, setSearchBy] = useState<SearchByProps>(stayService.getDeafultSearchProps())
    const [selectedSearchModule, setSelectedSearchModule] = useState<String>('destination')

    const onToggleSearchDisplay = () => {
        setIsSearchOpen(prevState => !prevState)
    }

    const onSelectSearchModule = (searchModule: String) => {
        if (selectedSearchModule === searchModule) return
        setSelectedSearchModule(searchModule)
    }

    const onSetSearchBy = () => {}

    const onSearchStays = () => {}

    const searchProps = {
        onToggleSearchDisplay,
        searchBy,
        onSelectSearchModule,
        selectedSearchModule,
        onSetSearchBy,
        onSearchStays,
    }

    return (
        <header className={`main-layout full app-header ${isSearchOpen ? 'expanded' : ''}`}>
            <nav className='app-nav'>
                <AppLogo />
                {isSearchOpen ? (
                    <SearchForm {...searchProps} />
                ) : (
                    <SearchTeaser
                        onToggleSearchDisplay={onToggleSearchDisplay}
                        onSelectSearchModule={onSelectSearchModule}
                    />
                )}
                <Link to='./'>Airbnb your home</Link>
                <UserMenu />
            </nav>
        </header>
    )
}
