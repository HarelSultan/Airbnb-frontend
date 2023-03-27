import { FaSearch } from 'react-icons/fa'
import { SearchByProps, SearchModule } from '../../../interfaces/search-by-interface'
import { utilService } from '../../../services/util.service'
import { SearchDates } from './search-dates'
import { SearchDestination } from './search-destination'
import { SearchGuests } from './search-guests'

interface Props {
    searchBy: SearchByProps
    onSelectSearchModule: (searchModule: string) => void
    selectedSearchModule: string
    onSetSearchBy: (updatedSearchBy: SearchByProps) => void
    onSearchStays: (ev: React.MouseEvent<HTMLButtonElement>) => void
}

export function SearchForm({
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
                    className={`search-module destination ${
                        selectedSearchModule === 'searchDestination' ? 'active' : ''
                    }`}
                    onClick={() => onSelectSearchModule('searchDestination')}
                >
                    <p className='module-title'>Where</p>
                    <input type='text' value={searchBy.destination} placeholder='Search destinations' readOnly />
                </label>
                <label
                    className={`search-module check-in ${selectedSearchModule === 'searchCheckInDate' ? 'active' : ''}`}
                    onClick={() => onSelectSearchModule('searchCheckInDate')}
                >
                    <p className='module-title'>Check in</p>
                    <input
                        type='text'
                        value={utilService.formatDate(searchBy.checkIn)}
                        placeholder='Add dates'
                        readOnly
                    />
                </label>
                <label
                    className={`search-module check-out ${
                        selectedSearchModule === 'searchCheckOutDate' ? 'active' : ''
                    }`}
                    onClick={() => onSelectSearchModule('searchCheckOutDate')}
                >
                    <p className='module-title'>Check out</p>
                    <input
                        type='text'
                        value={utilService.formatDate(searchBy.checkOut)}
                        placeholder='Add dates'
                        readOnly
                    />
                </label>
                <label
                    className={`search-module guests ${selectedSearchModule === 'searchGuests' ? 'active' : ''}`}
                    onClick={() => onSelectSearchModule('searchGuests')}
                >
                    <p className='module-title'>Who</p>
                    <input
                        type='text'
                        value={utilService.formatGuestCount(searchBy.guests)}
                        placeholder='Add guests'
                        readOnly
                    />
                    <button
                        onClick={onSearchStays}
                        className={`btn btn-search flex flex-center ${selectedSearchModule ? 'extended' : ''}`}
                    >
                        <FaSearch />
                        {selectedSearchModule && 'Search'}
                    </button>
                </label>
            </form>
            {searchModuleMap[selectedSearchModule]}
        </section>
    )
}

// interface Module {
//     name: keyof SearchByProps
//     type: string
//     title: string
//     className: string
// }

// const searchModules: Module[] = [
//     {
//         name: 'destination',
//         type: 'searchDestination',
//         title: 'where',
//         className: 'destination',
//     },
//     {
//         type: 'searchCheckInDate',
//         title: 'check in',
//         name: 'checkIn',
//         className: 'check-in',
//     },
//     {
//         type: 'searchCheckOutDate',
//         title: 'check out',
//         name: 'checkOut',
//         className: 'check-out',
//     },
//     {
//         type: 'searchGuests',
//         title: 'Who',
//         name: 'guests',
//         className: 'guests',
//     },
// ]

// {searchModules.map(module => (
//     <label
//         className={`search-module ${module.name} ${
//             selectedSearchModule === module.type ? 'active' : ''
//         }`}
//         onClick={() => onSelectSearchModule(module.type)}
//     >
//         <p className='module-title'>{module.title}</p>

//         {module.type === 'searchDestination' ? (
//             <input type='text' value={searchBy.destination} />
//         ) : (
//             <input
//                 type='text'
//                 value={
//                     module.type === 'searchGuests'
//                         ? utilService.formatGuestCount(searchBy.guests)
//                         : (searchBy[module.name] as Date).toLocaleDateString()
//                 }
//             />
//         )}
//         {module.type === 'searchGuests' && (
//             <button className='btn btn-search flex flex-center'>
//                 <FaSearch />
//                 Search
//             </button>
//         )}
//     </label>
// ))}
