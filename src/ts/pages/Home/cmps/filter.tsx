import { useState, memo } from 'react'
import { LabelFilter } from './Filter/label-filter'
import { FilterByProps } from '../../../interfaces/filter-by-interface'
import { StayFilters } from './Filter/stay-filter'
import { DarkOverlay } from '../../../cmps/AppHeader/cmps/dark-overlay'
import { setFilter } from '../../../store/stay/stay.action'
import { stayService } from '../../../services/stay.service'

interface Props {
    isMobile: boolean
}

const labelFilters = stayService.getLabelFilters()

export const Filter = memo(function Filter({ isMobile }: Props) {
    const [filterBy, setFilterBy] = useState<FilterByProps>(stayService.getDefaultFilterProps())
    const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false)

    const onSelectLabelFilter = (selectedLabel: string) => {
        if (selectedLabel === filterBy.label) return
        // Castels, Iconic Cities, Ski-in/out, Shephred's huts, Lake
        setFilterBy(prevFilterBy => {
            const updatedFilter = { ...prevFilterBy, label: selectedLabel }
            console.log(updatedFilter)
            setFilter(updatedFilter)
            return updatedFilter
        })
    }
    console.log('rendered')
    const toggleFilterModalDisplay = () => {
        setIsFilterModalOpen(prevState => !prevState)
    }

    const onSetFilterBy = (updatedFilter: FilterByProps) => {
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

    const labelFilterProps = {
        labelFilters,
        selectedLabelFilter: filterBy.label,
        onSelectLabelFilter,
    }

    const stayFilterProps = {
        filterBy,
        onSetFilterBy,
        onCloseModal: toggleFilterModalDisplay,
        onClearFilterBy,
        onFilterStays,
    }

    return (
        <section className={`filter ${isFilterModalOpen ? 'modal-open' : ''}`}>
            <LabelFilter {...labelFilterProps} />
            {!isMobile && (
                <>
                    <button className='btn btn-filters' onClick={toggleFilterModalDisplay}>
                        <svg
                            viewBox='0 0 16 16'
                            xmlns='http://www.w3.org/2000/svg'
                            aria-hidden='true'
                            role='presentation'
                        >
                            <path d='M5 8c1.306 0 2.418.835 2.83 2H14v2H7.829A3.001 3.001 0 1 1 5 8zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm6-8a3 3 0 1 1-2.829 4H2V4h6.17A3.001 3.001 0 0 1 11 2zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z'></path>
                        </svg>
                        Filters
                    </button>
                    {isFilterModalOpen && (
                        <div className='filter-modal-container'>
                            <DarkOverlay isOpen={isFilterModalOpen} setIsOpen={toggleFilterModalDisplay} />
                            <StayFilters {...stayFilterProps} />
                        </div>
                    )}
                </>
            )}
        </section>
    )
})
