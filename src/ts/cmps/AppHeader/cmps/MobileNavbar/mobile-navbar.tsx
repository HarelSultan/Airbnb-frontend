import { useState } from 'react'
import { SearchByProps } from '../../../../interfaces/search-by-interface'
import { MobileSearchTeaser } from './cmps/mobile-search-teaser'
import { FilterByProps } from '../../../../interfaces/filter-by-interface'
import { stayService } from '../../../../services/stay.service'
import { setFilter } from '../../../../store/stay/stay.action'
import { StayFilters } from '../../../../pages/Home/cmps/Filter/stay-filter'
import { DarkOverlay } from '../dark-overlay'
import { MobileSearchForm } from './cmps/mobile-search-form'

interface Props {
    searchBy: SearchByProps
    isSearchOpen: boolean
    onToggleSearchDisplay: () => void
    onSelectSearchModule: (searchModule: string) => void
    selectedSearchModule: string
    onSetSearchBy: (updatedSearchBy: SearchByProps) => void
    onSearchStays: (ev: React.MouseEvent<HTMLButtonElement>) => void
}

export function MobileNavbar({
    searchBy,
    isSearchOpen,
    onToggleSearchDisplay,
    onSelectSearchModule,
    selectedSearchModule,
    onSetSearchBy,
    onSearchStays,
}: Props) {
    // ? const {checkIn, checkOut} = searchBy

    const [filterBy, setFilterBy] = useState<FilterByProps>(stayService.getDefaultFilterProps())
    const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false)

    const toggleFilterModalDisplay = () => {
        setIsFilterModalOpen(prevState => !prevState)
    }

    const onSetFilterBy = (updatedFilter: FilterByProps) => {
        console.log(updatedFilter)
        setFilterBy(updatedFilter)
    }

    const onClearFilterBy = () => {
        setFilterBy(stayService.getDefaultFilterProps())
    }

    const onFilterStays = () => {
        toggleFilterModalDisplay()
        // query new stays with filter props
        setFilter(filterBy)
    }

    const searchProps = {
        searchBy,
        onSelectSearchModule,
        selectedSearchModule,
        onSetSearchBy,
        onSearchStays,
        onToggleSearchDisplay,
    }

    const stayFilterProps = {
        filterBy,
        onSetFilterBy,
        onCloseModal: toggleFilterModalDisplay,
        onClearFilterBy,
        onFilterStays,
    }

    return (
        <nav className='mobile-navbar'>
            {!isSearchOpen ? (
                <>
                    <MobileSearchTeaser searchBy={searchBy} onToggleSearchDisplay={onToggleSearchDisplay} />
                    <button className='btn btn-filters' onClick={toggleFilterModalDisplay}>
                        <svg
                            viewBox='0 0 16 16'
                            xmlns='http://www.w3.org/2000/svg'
                            aria-hidden='true'
                            role='presentation'
                        >
                            <path d='M5 8c1.306 0 2.418.835 2.83 2H14v2H7.829A3.001 3.001 0 1 1 5 8zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm6-8a3 3 0 1 1-2.829 4H2V4h6.17A3.001 3.001 0 0 1 11 2zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z'></path>
                        </svg>
                    </button>
                </>
            ) : (
                <MobileSearchForm {...searchProps} />
            )}

            {isFilterModalOpen && (
                <div className='filter-modal-container'>
                    <DarkOverlay isOpen={isFilterModalOpen} setIsOpen={toggleFilterModalDisplay} />
                    <StayFilters {...stayFilterProps} />
                </div>
            )}
        </nav>
    )
}
