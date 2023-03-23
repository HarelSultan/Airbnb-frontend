import { FaSearch } from 'react-icons/fa'
import { SearchByProps } from '../../../interfaces/search-by-interface'
import { utilService } from '../../../services/util.service'
import { SearchDestination } from './search-destination'

interface Props {
    onToggleSearchDisplay: () => void
    searchBy: SearchByProps
    onSelectSearchModule: (searchModule: String) => void
    selectedSearchModule: String
    onSetSearchBy: () => void
    onSearchStays: () => void
}

export function SearchForm({
    onToggleSearchDisplay,
    searchBy,
    onSelectSearchModule,
    selectedSearchModule,
    onSetSearchBy,
    onSearchStays,
}: Props) {
    return (
        <section className='search-form-container'>
            <form className='search-form'>
                <label
                    className={`search-module destination ${selectedSearchModule === 'destination' ? 'active' : ''}`}
                    onClick={() => onSelectSearchModule('destination')}
                >
                    <p className='module-title'>Where</p>
                    <input type='text' value={searchBy.destination} placeholder='Search destinations' readOnly />
                </label>
                <label
                    className={`search-module check-in ${selectedSearchModule === 'checkIn' ? 'active' : ''}`}
                    onClick={() => onSelectSearchModule('checkIn')}
                >
                    <p className='module-title'>Check in</p>
                    <input type='text' value={searchBy.checkIn.toLocaleDateString()} placeholder='Add dates' readOnly />
                </label>
                <label
                    className={`search-module check-out ${selectedSearchModule === 'checkOut' ? 'active' : ''}`}
                    onClick={() => onSelectSearchModule('checkOut')}
                >
                    <p className='module-title'>Check out</p>
                    <input
                        type='text'
                        value={searchBy.checkOut.toLocaleDateString()}
                        placeholder='Add dates'
                        readOnly
                    />
                </label>
                <label
                    className={`search-module guests ${selectedSearchModule === 'guests' ? 'active' : ''}`}
                    onClick={() => onSelectSearchModule('guests')}
                >
                    <p className='module-title'>Who</p>
                    <input
                        type='text'
                        value={utilService.formatGuestCount(searchBy.guests)}
                        placeholder='Add guests'
                        readOnly
                    />
                    <button className='btn btn-search flex flex-center'>
                        <FaSearch />
                        Search
                    </button>
                </label>
            </form>
            <SearchDestination searchBy={searchBy} onSetSearchBy={onSetSearchBy} />
        </section>
    )
}
