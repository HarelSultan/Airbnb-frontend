import { AiOutlineClose } from 'react-icons/ai'
import { FilterByProps } from '../../../../interfaces/filter-by-interface'
import { PriceFilter } from './price-filter'
import { TypeFilter } from './type-filter'

interface Props {
    filterBy: FilterByProps
    onSetFilterBy: (updatedFilter: FilterByProps) => void
    onCloseModal: () => void
    onClearFilterBy: () => void
    onSearchStays: () => void
}

export function StayFilters({ filterBy, onSetFilterBy, onCloseModal, onClearFilterBy, onSearchStays }: Props) {
    const stayFilterProps = {
        filterBy,
        onSetFilterBy,
    }

    return (
        <section className='stay-filter'>
            <div className='filter-header'>
                <button onClick={onCloseModal} className='btn btn-close'>
                    <AiOutlineClose />
                </button>
                <h3>Filters</h3>
            </div>
            <div className='stay-filters-container'>
                <PriceFilter {...stayFilterProps} />
                <TypeFilter {...stayFilterProps} />
            </div>
            <div className='filter-footer'>
                <button onClick={onClearFilterBy} className='btn btn-clear-filters'>
                    Clear all
                </button>
                <button onClick={onSearchStays} className='btn btn-filter-stays'>
                    Show homes
                </button>
            </div>
        </section>
    )
}
