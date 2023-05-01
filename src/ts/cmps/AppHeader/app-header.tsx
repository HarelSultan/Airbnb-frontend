import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { SearchTeaser } from '../search-teaser'
import { UserMenu } from '../user-menu'
import { AppLogo } from './Logo/logo'
import { useState, useRef } from 'react'
import { SearchForm } from './cmps/search-form'
import { stayService } from '../../services/stay.service'
import { SearchByProps } from '../../interfaces/search-by-interface'
import { DarkOverlay } from './cmps/dark-overlay'
import { utilService } from '../../services/util.service'
import { MobileNavbar } from './cmps/MobileNavbar/mobile-navbar'
import { UserProps } from '../../interfaces/user-interface'

interface Props {
    isMobile?: boolean
    onToggleLoginSignup: (isSignup: boolean) => void
    loggedInUser: UserProps | null
}

export function AppHeader({ isMobile, onToggleLoginSignup, loggedInUser }: Props) {
    const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false)
    const [searchBy, setSearchBy] = useState<SearchByProps>(stayService.getDeafultSearchProps())
    const [selectedSearchModule, setSelectedSearchModule] = useState<string>('searchDestination')

    const navigate = useNavigate()
    const searchFormWrapperRef = useRef<HTMLDivElement>(null)
    const [_, setSearchParams] = useSearchParams()

    const onToggleSearchDisplay = () => {
        setIsSearchOpen(prevState => !prevState)
    }

    const onSelectSearchModule = (searchModule: string) => {
        if (selectedSearchModule === searchModule) return
        setSelectedSearchModule(searchModule)
    }

    const onCloseSearchModule = (ev: React.MouseEvent<HTMLDivElement>) => {
        if (isMobile) return
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
        const searchParams = new URLSearchParams(utilService.formatSearchParams(searchBy))
        setSearchParams(searchParams)
    }

    const onBecomeHost = () => {
        if (!loggedInUser) return onToggleLoginSignup(false)
        navigate('/host/edit')
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
            {isMobile ? (
                <MobileNavbar
                    isSearchOpen={isSearchOpen}
                    onToggleSearchDisplay={onToggleSearchDisplay}
                    {...searchProps}
                />
            ) : (
                <>
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

                        <button onClick={onBecomeHost} className='btn air-bnb-host'>
                            Airbnb your home
                        </button>
                        <UserMenu
                            onToggleLoginSignup={onToggleLoginSignup}
                            loggedInUser={loggedInUser}
                            onBecomeHost={onBecomeHost}
                            navigate={navigate}
                        />
                    </nav>
                </>
            )}
        </header>
    )
}
