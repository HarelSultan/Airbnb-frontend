import { DateRangePicker } from 'react-date-range'
import { ReserveByProps } from '../../../../../interfaces/reserve-by-interface'
import { DatesProps } from '../../../../../interfaces/stay-interface'

interface Props {
    reserveBy: ReserveByProps
    onSetReserveBy: (updatedReservation: ReserveByProps) => void
    selectedReserveModule: string | null
    onSelectReserveModule: (reserveModule: string | null) => void
    takenDates?: DatesProps[]
}

export function ReserveDates({
    reserveBy,
    onSetReserveBy,
    selectedReserveModule,
    onSelectReserveModule,
    takenDates,
}: Props) {
    const selectionRange = {
        startDate: reserveBy.checkIn,
        endDate: reserveBy.checkOut,
        key: 'selection',
    }

    const handleDateSelect = (ranges: any) => {
        const updatedSearchBy = {
            ...reserveBy,
            checkIn: ranges.selection.startDate,
            checkOut: ranges.selection.endDate,
        }
        onSetReserveBy(updatedSearchBy)
        const nextReserveModule =
            selectedReserveModule === 'reserveCheckInDate' ? 'reserveCheckOutDate' : 'reserveGuests'
        onSelectReserveModule(nextReserveModule)
    }

    const formatTakenDates = () => {
        if (!takenDates) return undefined
        return takenDates.reduce((acc: Date[], takenDate) => {
            acc.push(...getTakenDates(takenDate.checkIn, takenDate.checkOut))
            return acc
        }, [])
    }

    const getTakenDates = (start: Date, end: Date): Date[] => {
        const takenDates = []
        let currDate = new Date(start)
        end = new Date(end)
        while (currDate < end) {
            takenDates.push(new Date(currDate))
            currDate.setDate(currDate.getDate() + 1)
        }
        return takenDates
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
                disabledDates={formatTakenDates()}
            />
        </section>
    )
}
