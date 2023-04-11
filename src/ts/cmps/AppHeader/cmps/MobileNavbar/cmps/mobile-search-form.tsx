import { utilService } from '../../../../../services/util.service'
import { SearchByProps, SearchModule } from '../../../../../interfaces/search-by-interface'
import { SearchDestination } from '../../search-destination'
import { SearchDates } from '../../search-dates'
import { SearchGuests } from '../../search-guests'
import { AiOutlineClose } from 'react-icons/ai'
import { FaSearch } from 'react-icons/fa'
import { CtaBtn } from '../../../../cta-btn'

interface Props {
    searchBy: SearchByProps
    onSetSearchBy: (updatedSearchBy: SearchByProps) => void
    selectedSearchModule: string
    onSelectSearchModule: (searchModule: string) => void
    onSearchStays: (ev: React.MouseEvent<HTMLButtonElement>) => void
}

export function MobileSearchForm({
    searchBy,
    onSetSearchBy,
    selectedSearchModule,
    onSelectSearchModule,
    onSearchStays,
}: Props) {
    const formattedDateRange: string =
        searchBy.checkIn && searchBy.checkOut
            ? utilService.formatDateRange({
                  checkIn: searchBy.checkIn,
                  checkOut: searchBy.checkOut,
              })
            : 'Add dates'

    const searchModuleProps = {
        searchBy,
        onSetSearchBy,
        selectedSearchModule,
        onSelectSearchModule,
    }

    return (
        <section className='mobile-search-form'>
            <button className='btn-btn-close'>
                <AiOutlineClose />
            </button>
            <h4 className='underline'>Stays</h4>

            {selectedSearchModule !== 'searchDestination' ? (
                <div onClick={() => onSelectSearchModule('searchDestination')} className='search-module destination'>
                    <span>Where</span>
                    <span>{searchBy.destination}</span>
                </div>
            ) : (
                <div className='search-module expanded'>
                    <h2>Where to?</h2>
                    <label>
                        <FaSearch />
                        <input type='text' value={searchBy.destination} placeholder='Search destination' readOnly />
                    </label>
                    <SearchDestination {...searchModuleProps} />
                </div>
            )}

            {selectedSearchModule !== 'searchCheckInDate' ? (
                <div onClick={() => onSelectSearchModule('searchCheckInDate')} className='search-module dates'>
                    <span>When</span>
                    <span>{formattedDateRange}</span>
                </div>
            ) : (
                <div className='search-module expanded'>
                    <h2>When's your trip?</h2>
                    <SearchDates {...searchModuleProps} />
                    <div className='search-dates-footer'>
                        <button className='btn btn-skip underline'>Skip</button>
                        <button className='btn btn-next'>Next</button>
                    </div>
                </div>
            )}

            {selectedSearchModule !== 'searchGuests' ? (
                <div onClick={() => onSelectSearchModule('searchGuests')} className='search-module guests'>
                    <span>Who</span>
                    <span>{utilService.formatGuestCount(searchBy.guests) || 'Add guests'}</span>
                </div>
            ) : (
                <div className='search-module expanded'>
                    <h2>Who's coming?</h2>
                    <SearchGuests {...searchModuleProps} />
                </div>
            )}
            <div className='search-form-footer'>
                <button className='btn btn-clear underline'>Clear all</button>
                <CtaBtn onClickCB={onSearchStays} txt={'Search'} />
            </div>
        </section>
    )
}
