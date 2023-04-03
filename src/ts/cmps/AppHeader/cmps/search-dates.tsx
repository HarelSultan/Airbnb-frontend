import { DateRangePicker } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { SearchByProps } from '../../../interfaces/search-by-interface'
import { DatesProps } from '../../../interfaces/stay-interface'

interface Props {
    searchBy: SearchByProps
    onSetSearchBy: (updatedSearchBy: SearchByProps) => void
    selectedSearchModule: string
    onSelectSearchModule: (searchModule: string) => void
    takenDates?: DatesProps[] | null
}

export function SearchDates({
    searchBy,
    onSetSearchBy,
    selectedSearchModule,
    onSelectSearchModule,
    takenDates = null,
}: Props) {
    const selectionRange = {
        startDate: searchBy.checkIn || new Date(),
        endDate: searchBy.checkOut || new Date(),
        key: 'selection',
    }

    const handleDateSelect = (ranges: any) => {
        const updatedSearchBy = { ...searchBy, checkIn: ranges.selection.startDate, checkOut: ranges.selection.endDate }
        onSetSearchBy(updatedSearchBy)
        const nextSearchModule = selectedSearchModule === 'searchCheckInDate' ? 'searchCheckOutDate' : 'searchGuests'
        onSelectSearchModule(nextSearchModule)
    }

    return (
        <section className='expanded-search-module search-dates'>
            <DateRangePicker
                ranges={[selectionRange]}
                minDate={new Date()}
                rangeColors={['#ff385c']}
                onChange={handleDateSelect}
                showMonthAndYearPickers={false}
                showDateDisplay={false}
            />
        </section>
    )
}
