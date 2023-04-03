import { FaSearch } from 'react-icons/fa'
import { SearchByProps } from '../interfaces/search-by-interface'
import { utilService } from '../services/util.service'

interface Props {
    searchBy: SearchByProps
    onToggleSearchDisplay: () => void
    onSelectSearchModule: (searchModule: string) => void
}

export function SearchTeaser({ searchBy, onToggleSearchDisplay, onSelectSearchModule }: Props) {
    return (
        <div className='search-teaser flex' onClick={onToggleSearchDisplay}>
            <button className='btn btn-location' onClick={() => onSelectSearchModule('searchDestination')}>
                <span className='divider'>{searchBy.destination || 'Anywhere'}</span>
            </button>
            <button className='btn btn-date' onClick={() => onSelectSearchModule('searchCheckInDate')}>
                <span className='divider'>
                    {searchBy.checkIn && searchBy.checkOut
                        ? utilService.formatDateRange({
                              checkIn: searchBy.checkIn,
                              checkOut: searchBy.checkOut,
                          })
                        : 'Any week'}
                </span>
            </button>
            <button className='btn btn-guests' onClick={() => onSelectSearchModule('guests')}>
                <span>{searchBy.guests.adults ? utilService.formatGuestCount(searchBy.guests) : 'Add guests'}</span>
            </button>
            <button className='btn search-wrapper flex flex-center'>
                <FaSearch />
            </button>
        </div>
    )
}
