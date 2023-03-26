import { FaSearch } from 'react-icons/fa'
import { SearchByProps, SearchModule } from '../../../interfaces/search-by-interface'
import { utilService } from '../../../services/util.service'
import { SearchDates } from './search-dates'
import { SearchDestination } from './search-destination'
import { SearchGuests } from './search-guests'

interface Props {
    onToggleSearchDisplay: () => void
    searchBy: SearchByProps
    onSelectSearchModule: (searchModule: string) => void
    selectedSearchModule: string
    onSetSearchBy: (updatedSearchBy: SearchByProps) => void
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
    const searchModuleProps = {
        searchBy,
        onSetSearchBy,
        selectedSearchModule,
        onSelectSearchModule,
    }

    const searchModuleMap: SearchModule = {
        searchDestination: <SearchDestination {...searchModuleProps} />,
        searchCheckInDate: <SearchDates {...searchModuleProps} />,
        searchCheckOutDate: <SearchDates {...searchModuleProps} />,
        searchGuests: <SearchGuests {...searchModuleProps} />,
    }

    return (
        <section className='search-form-container'>
            <form className='search-form'>
                <label
                    className={`search-module destination ${selectedSearchModule === 'destination' ? 'active' : ''}`}
                    onClick={() => onSelectSearchModule('searchDestination')}
                >
                    <p className='module-title'>Where</p>
                    <input type='text' value={searchBy.destination} placeholder='Search destinations' readOnly />
                </label>
                <label
                    className={`search-module check-in ${selectedSearchModule === 'checkIn' ? 'active' : ''}`}
                    onClick={() => onSelectSearchModule('searchCheckInDate')}
                >
                    <p className='module-title'>Check in</p>
                    <input type='text' value={searchBy.checkIn.toLocaleDateString()} placeholder='Add dates' readOnly />
                </label>
                <label
                    className={`search-module check-out ${selectedSearchModule === 'checkOut' ? 'active' : ''}`}
                    onClick={() => onSelectSearchModule('searchCheckOutDate')}
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
                    onClick={() => onSelectSearchModule('searchGuests')}
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
            {searchModuleMap[selectedSearchModule]}
        </section>
    )
}
