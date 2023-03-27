import { AiOutlineClose } from 'react-icons/ai'
import { DarkOverlay } from '../../../../cmps/AppHeader/cmps/dark-overlay'
import { PriceFilter } from './price-filter'

interface Props {
    onCloseModal: () => void
}

export function StayFilters({ onCloseModal }: Props) {
    return (
        <section className='stay-filter'>
            <div className='filter-header'>
                <button className='btn btn-close'>
                    <AiOutlineClose />
                </button>
                <h3>Filters</h3>
            </div>
            <PriceFilter />
            <div className='filter-footer'>
                <button className='btn btn-clear-filters'>Clear all</button>
                <button className='btn btn-filter-stays'>Show homes</button>
            </div>
        </section>
    )
}
