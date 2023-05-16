import { utilService } from '../../../../../services/util.service'
import { SearchByProps } from '../../../../../interfaces/search-by-interface'
import { SearchDestination } from '../../search-destination'
import { SearchDates } from '../../search-dates'
import { AiOutlineClose } from 'react-icons/ai'
import { FaSearch } from 'react-icons/fa'
import { CtaBtn } from '../../../../cta-btn'
import { GuestCounter } from '../../../../guest-counter'
import { stayService } from '../../../../../services/stay.service'

interface Props {
    searchBy: SearchByProps
    onSetSearchBy: (updatedSearchBy: SearchByProps) => void
    selectedSearchModule: string
    onSelectSearchModule: (searchModule: string) => void
    onSearchStays: (ev: React.MouseEvent<HTMLButtonElement>) => void
    onToggleSearchDisplay: () => void
}

export function MobileSearchForm({
    searchBy,
    onSetSearchBy,
    selectedSearchModule,
    onSelectSearchModule,
    onSearchStays,
    onToggleSearchDisplay,
}: Props) {
    const formattedDateRange: string =
        searchBy.checkIn && searchBy.checkOut
            ? utilService.formatDateRange({
                  checkIn: searchBy.checkIn,
                  checkOut: searchBy.checkOut,
              })
            : 'Add dates'

    const onClearSearchBy = () => {
        onSetSearchBy(stayService.getDeafultSearchProps())
    }

    const searchModuleProps = {
        searchBy,
        onSetSearchBy,
        selectedSearchModule,
        onSelectSearchModule,
    }

    return (
        <section className='mobile-search-form'>
            <div className='mobile-search-header'>
                <button onClick={onToggleSearchDisplay} className='btn btn-close'>
                    <AiOutlineClose />
                </button>
                <h4 className='search-stays'>Stays</h4>
            </div>

            {selectedSearchModule !== 'searchDestination' ? (
                <div onClick={() => onSelectSearchModule('searchDestination')} className='search-module destination'>
                    <span className='search-title'>Where</span>
                    <span className='search-value'>{searchBy.destination || `I'm flexible`}</span>
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

            {selectedSearchModule !== 'searchCheckInDate' && selectedSearchModule !== 'searchCheckOutDate' ? (
                <div onClick={() => onSelectSearchModule('searchCheckInDate')} className='search-module dates'>
                    <span className='search-title'>When</span>
                    <span className='search-value'>{formattedDateRange}</span>
                </div>
            ) : (
                <div className='search-module search-dates expanded'>
                    <h2>When's your trip?</h2>
                    <SearchDates {...searchModuleProps} />
                    <div className='search-dates-footer'>
                        <button onClick={() => onSelectSearchModule('searchGuests')} className='btn btn-skip underline'>
                            Skip
                        </button>
                    </div>
                </div>
            )}

            {selectedSearchModule !== 'searchGuests' ? (
                <div onClick={() => onSelectSearchModule('searchGuests')} className='search-module guests'>
                    <span className='search-title'>Who</span>
                    <span className='search-value'>
                        {utilService.formatGuestCount(searchBy.guests) || 'Add guests'}
                    </span>
                </div>
            ) : (
                <div className='search-module guests expanded'>
                    <h2>Who's coming?</h2>
                    <GuestCounter state={searchBy} onSetSearchBy={onSetSearchBy} />
                </div>
            )}
            <div className='search-form-footer'>
                <button onClick={onClearSearchBy} className='btn btn-clear underline'>
                    Clear all
                </button>
                <CtaBtn onClickCB={onSearchStays} txt={'Search'} />
            </div>
        </section>
    )
}
