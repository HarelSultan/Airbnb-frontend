import { Link } from 'react-router-dom'
import { SearchTeaser } from '../search-teaser'
import { UserMenu } from '../user-menu'
import { AppLogo } from './Logo/logo'
import { useState, useRef } from 'react'
import { SearchForm } from './cmps/search-form'
import { stayService } from '../../services/stay.service'
import { SearchByProps } from '../../interfaces/search-by-interface'
import { DarkOverlay } from './cmps/dark-overlay'

export function AppHeader() {
    const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false)
    const [searchBy, setSearchBy] = useState<SearchByProps>(stayService.getDeafultSearchProps())
    const [selectedSearchModule, setSelectedSearchModule] = useState<string>('searchDestination')

    const searchFormWrapperRef = useRef<HTMLDivElement>(null)

    const onToggleSearchDisplay = () => {
        setIsSearchOpen(prevState => !prevState)
    }

    const onSelectSearchModule = (searchModule: string) => {
        if (selectedSearchModule === searchModule) return
        setSelectedSearchModule(searchModule)
    }

    const onCloseSearchModule = (ev: React.MouseEvent<HTMLDivElement>) => {
        if (!isSearchOpen || !selectedSearchModule) return
        const searchWrapper = searchFormWrapperRef.current
        const clickedElement = ev.target as Node
        if (!searchWrapper?.contains(clickedElement)) setSelectedSearchModule('')
    }

    const onSetSearchBy = (updatedSearchBy: SearchByProps) => {
        setSearchBy(updatedSearchBy)
    }

    const onSearchStays = (ev: React.MouseEvent<HTMLButtonElement>) => {
        ev.preventDefault()
        setIsSearchOpen(false)
        console.log(searchBy)
    }

    const searchProps = {
        searchBy,
        onSelectSearchModule,
        selectedSearchModule,
        onSetSearchBy,
        onSearchStays,
    }

    return (
        <header
            onClick={onCloseSearchModule}
            className={`main-layout full app-header ${isSearchOpen ? 'expanded' : ''}`}
        >
            <DarkOverlay isOpen={isSearchOpen} setIsOpen={onToggleSearchDisplay} />
            <nav className='app-nav'>
                <AppLogo />
                {isSearchOpen ? (
                    <div ref={searchFormWrapperRef} className='search-form-wrapper'>
                        <SearchForm {...searchProps} />
                    </div>
                ) : (
                    <SearchTeaser
                        searchBy={searchBy}
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
