import { FaSearch } from 'react-icons/fa'
import { SearchByProps } from '../../../../../interfaces/search-by-interface'
import { utilService } from '../../../../../services/util.service'

interface Props {
    searchBy: SearchByProps
    onToggleSearchDisplay: () => void
}

export function MobileSearchTeaser({ searchBy, onToggleSearchDisplay }: Props) {
    return (
        <div onClick={onToggleSearchDisplay} className='mobile-search-teaser'>
            <FaSearch />
            <div className='search-info'>
                <h4>{searchBy.destination || 'Anywhere'}</h4>
                <span>
                    {searchBy.checkIn && searchBy.checkOut
                        ? utilService.formatDateRange({
                              checkIn: searchBy.checkIn,
                              checkOut: searchBy.checkOut,
                          })
                        : 'Any week'}
                </span>
                <span className='seperator'>·</span>
                <span>{searchBy.guests.adults ? utilService.formatGuestCount(searchBy.guests) : 'Add guests'}</span>
            </div>
        </div>
    )
}
