import { useState, useRef } from 'react'

import { useOnClickOutside } from '../../../../hooks/use-on-click-outside'
import { stayService } from '../../../../services/stay.service'
import { utilService } from '../../../../services/util.service'

import { StayReservationProps, StayReviewProps } from '../../../../interfaces/stay-interface'
import { ReserveByProps, ReserveModule } from '../../../../interfaces/reserve-by-interface'

import { ReserveDates } from './cmps/reserve-dates'
import { CtaBtn } from '../../../../cmps/cta-btn'
import { PricingSummary } from './cmps/pricing-summary'
import { GuestCounter } from '../../../../cmps/guest-counter'
import { REVIEWS_MODAL } from '../../stay-page'
import { AiFillStar, AiOutlineDown, AiOutlineUp } from 'react-icons/ai'

interface Props {
    price: number
    reviews: StayReviewProps[]
    stayReservations: StayReservationProps[]
    reserveBy: ReserveByProps
    onSetReserveBy: (updatedReservation: ReserveByProps) => void
    onReserveStay: () => void
    nightsCount: number
    onOpenModal: (expandedModal: string) => void
}

// Search by ?
export function ReserveStay({
    price,
    reviews,
    stayReservations,
    reserveBy,
    onSetReserveBy,
    onReserveStay,
    nightsCount,
    onOpenModal,
}: Props) {
    const [selectedReserveModule, setSelectedReserveModule] = useState<string | null>(null)

    const activeReserveModuleRef = useRef(null)

    const onSelectReserveModule = (reserveModule: string | null) => {
        if (reserveModule === selectedReserveModule) return
        setSelectedReserveModule(reserveModule)
    }

    const formatDate = (date: Date | null) => {
        if (!date) return undefined
        return date.toLocaleDateString('default', { month: 'numeric', day: 'numeric', year: 'numeric' })
    }

    const onCloseReserveModule = () => {
        console.log('closed')
        setSelectedReserveModule(null)
    }

    useOnClickOutside(activeReserveModuleRef, onCloseReserveModule)

    const reserveModuleProps = {
        reserveBy,
        onSetReserveBy,
        selectedReserveModule,
        onSelectReserveModule,
        stayReservations,
        nightsCount,
    }

    const reserveModuleMap: ReserveModule = {
        reserveCheckInDate: <ReserveDates {...reserveModuleProps} />,
        reserveCheckOutDate: <ReserveDates {...reserveModuleProps} />,
        reserveGuests: (
            <GuestCounter
                state={reserveBy}
                onSetReserveBy={onSetReserveBy}
                onSelectReserveModule={onSelectReserveModule}
            />
        ),
    }

    return (
        <section className='reserve-stay'>
            <div className='reserve-header'>
                <div className='price'>
                    <h3>${price}</h3>
                    <span>night</span>
                </div>
                <div className='stay-rating flex align-center'>
                    <AiFillStar />
                    <span>{stayService.getStayAverageRating(reviews).toFixed(1)} ·</span>
                    <button onClick={() => onOpenModal(REVIEWS_MODAL)} className='btn review-count underline'>
                        {reviews.length} reviews
                    </button>
                </div>
            </div>

            <form className={selectedReserveModule ? 'expanded' : ''}>
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
                    <div className='arrow-wrapper'>
                        {selectedReserveModule === 'reserveGuests' ? <AiOutlineUp /> : <AiOutlineDown />}
                    </div>
                </label>
            </form>
            <CtaBtn onClickCB={onReserveStay} txt='Reserve' />
            <p className='disclaimer'>You won't be charged yet</p>
            <div ref={activeReserveModuleRef} className='reserve-module-wrapper'>
                {selectedReserveModule && reserveModuleMap[selectedReserveModule]}
            </div>
            <PricingSummary nightlyPrice={price} nightsCount={nightsCount} onOpenPriceModal={onOpenModal} />
        </section>
    )
}
