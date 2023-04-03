import { AiFillStar } from 'react-icons/ai'
import { DatesProps, StayReviewProps } from '../../../../interfaces/stay-interface'
import { stayService } from '../../../../services/stay.service'
import { useState } from 'react'
import { utilService } from '../../../../services/util.service'
import { ReserveByProps, ReserveModule } from '../../../../interfaces/reserve-by-interface'
import { ReserveDates } from './cmps/reserve-dates'
import { ReserveGuests } from './cmps/reserve-guests'

interface Props {
    price: number
    reviews: StayReviewProps[]
    takenDates: DatesProps[]
    reserveBy: ReserveByProps
    onSetReserveBy: (updatedReservation: ReserveByProps) => void
    onReserveStay: () => void
}

// Search by ?
export function ReserveStay({ price, reviews, takenDates, reserveBy, onSetReserveBy, onReserveStay }: Props) {
    const [selectedReserveModule, setSelectedReserveModule] = useState<string | null>(null)

    const onSelectReserveModule = (reserveModule: string | null) => {
        if (reserveModule === selectedReserveModule) return
        setSelectedReserveModule(reserveModule)
    }

    const formatDate = (date: Date | null) => {
        if (!date) return undefined
        return date.toLocaleDateString('default', { month: 'numeric', day: 'numeric', year: 'numeric' })
    }

    const reserveModuleProps = {
        reserveBy,
        onSetReserveBy,
        selectedReserveModule,
        onSelectReserveModule,
        takenDates,
    }

    const reserveModuleMap: ReserveModule = {
        reserveCheckInDate: <ReserveDates {...reserveModuleProps} />,
        reserveCheckOutDate: <ReserveDates {...reserveModuleProps} />,
        reserveGuests: <ReserveGuests {...reserveModuleProps} />,
    }

    return (
        <section className='reserve-stay'>
            <h3 className='price'>${price} night</h3>
            <div className='stay-rating flex align-center'>
                <AiFillStar />
                <span>{stayService.getStayAverageRating(reviews).toFixed(1)} ·</span>
                <span className='review-count underline'> {reviews.length} reviews</span>
            </div>
            <form>
                <label
                    className={`reserve-module check-in ${
                        selectedReserveModule === 'reserveCheckInDate' ? 'active' : ''
                    }`}
                    onClick={() => onSelectReserveModule('reserveCheckInDate')}
                >
                    <p className='module-title'>check in</p>
                    <input type='text' value={formatDate(reserveBy.checkIn)} placeholder='Add dates' readOnly />
                </label>
                <label
                    className={`reserve-module check-out ${
                        selectedReserveModule === 'reserveCheckOutDate' ? 'active' : ''
                    }`}
                    onClick={() => onSelectReserveModule('reserveCheckOutDate')}
                >
                    <p className='module-title'>check out</p>
                    <input type='text' value={formatDate(reserveBy.checkOut)} placeholder='Add dates' readOnly />
                </label>
                <label
                    className={`reserve-module guests ${selectedReserveModule === 'reserveGuests' ? 'active' : ''}`}
                    onClick={() => onSelectReserveModule('reserveGuests')}
                >
                    <p className='module-title'>guests</p>
                    <input
                        type='text'
                        value={utilService.formatGuestCount(reserveBy.guests)}
                        placeholder='Add guests'
                        readOnly
                    />
                    <button onClick={onReserveStay} className='btn btn-reserve flex flex-center'>
                        Reserve
                    </button>
                </label>
            </form>
            {selectedReserveModule && reserveModuleMap[selectedReserveModule]}
        </section>
    )
}
