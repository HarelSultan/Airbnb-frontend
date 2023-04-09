import { DateRangePicker } from 'react-date-range'
import { ReserveByProps } from '../../../../../interfaces/reserve-by-interface'
import { DatesProps } from '../../../../../interfaces/stay-interface'

interface Props {
    reserveBy: ReserveByProps
    onSetReserveBy: (updatedReservation: ReserveByProps) => void
    selectedReserveModule?: string | null
    onSelectReserveModule?: (reserveModule: string | null) => void
    takenDates?: DatesProps[]
    nightsCount: number
}

export function ReserveDates({
    reserveBy,
    onSetReserveBy,
    selectedReserveModule,
    onSelectReserveModule,
    takenDates,
    nightsCount,
}: Props) {
    const selectionRange = {
        startDate: reserveBy.checkIn,
        endDate: reserveBy.checkOut,
        key: 'selection',
    }

    const handleDateSelect = (ranges: any) => {
        const updatedReserveBy = {
            ...reserveBy,
            checkIn: ranges.selection.startDate,
            checkOut: ranges.selection.endDate,
        }
        onSetReserveBy(updatedReserveBy)
        if (onSelectReserveModule) {
            const nextReserveModule =
                selectedReserveModule === 'reserveCheckInDate' ? 'reserveCheckOutDate' : 'reserveGuests'
            onSelectReserveModule(nextReserveModule)
        }
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

    const formatReservationDates = () => {
        if (!reserveBy.checkIn || !reserveBy.checkOut) return 'Select dates'
        const formattedCheckIn = reserveBy.checkIn.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        })
        const formattedCheckOut = reserveBy.checkOut.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        })
        return `${formattedCheckIn} - ${formattedCheckOut}`
    }

    const onCloseDatesModule = () => {
        if (!onSelectReserveModule) return
        onSelectReserveModule(null)
    }

    return (
        <section className='expanded-search-module reserve-dates'>
            <h2>{nightsCount} Nights</h2>
            <p>{formatReservationDates()}</p>
            <DateRangePicker
                ranges={[selectionRange]}
                minDate={new Date()}
                rangeColors={['#ff385c']}
                onChange={handleDateSelect}
                showMonthAndYearPickers={false}
                showDateDisplay={false}
                disabledDates={formatTakenDates()}
            />
            {onSelectReserveModule && (
                <button onClick={onCloseDatesModule} className='btn btn-close'>
                    Close
                </button>
            )}
        </section>
    )
}
