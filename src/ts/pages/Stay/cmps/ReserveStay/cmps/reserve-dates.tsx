import { forwardRef } from 'react'
import { DateRangePicker } from 'react-date-range'
import { ReserveByProps } from '../../../../../interfaces/reserve-by-interface'
import { DatesProps, StayReservationProps } from '../../../../../interfaces/stay-interface'

interface Props {
    reserveBy: ReserveByProps
    onSetReserveBy: (updatedReservation: ReserveByProps) => void
    selectedReserveModule?: string | null
    onSelectReserveModule?: (reserveModule: string | null) => void
    stayReservations?: StayReservationProps[]
    nightsCount: number
}

export const ReserveDates = forwardRef<HTMLDivElement, Props>(
    (
        {
            reserveBy,
            onSetReserveBy,
            selectedReserveModule,
            onSelectReserveModule,
            stayReservations,
            nightsCount,
        }: Props,
        ref
    ) => {
        console.log(reserveBy)
        const selectionRange = {
            startDate: reserveBy.checkIn || new Date(),
            endDate: reserveBy.checkOut || new Date(),
            key: 'selection',
        }

        const handleDateSelect = (ranges: any) => {
            const updatedReserveBy =
                selectedReserveModule === 'reserveCheckOutDate'
                    ? { ...reserveBy, checkOut: ranges.selection.endDate }
                    : { ...reserveBy, checkIn: ranges.selection.startDate, checkOut: ranges.selection.endDate }

            onSetReserveBy(updatedReserveBy)
            if (onSelectReserveModule) {
                const nextReserveModule =
                    selectedReserveModule === 'reserveCheckInDate' ? 'reserveCheckOutDate' : 'reserveGuests'
                onSelectReserveModule(nextReserveModule)
            }
        }

        const formatTakenDates = () => {
            if (!stayReservations) return undefined
            return stayReservations.reduce((acc: Date[], reservation) => {
                acc.push(...getTakenDates(reservation.dates.checkIn, reservation.dates.checkOut))
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
            <section className='expanded-search-module reserve-dates' ref={ref}>
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
)
