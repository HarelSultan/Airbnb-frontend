import { utilService } from '../../../../services/util.service'
import { ReserveByProps } from '../../../../interfaces/reserve-by-interface'
import { CtaBtn } from '../../../../cmps/cta-btn'
import { RESERVE_DATES_MODAL } from '../../stay-page'
interface Props {
    price: number
    reserveBy: ReserveByProps
    onReserveStay: () => void
    onOpenDatesModal: (expandedModal: string) => void
}

export function MobileReserveStay({ price, reserveBy, onReserveStay, onOpenDatesModal }: Props) {
    return (
        <section className='full mobile-reserve-stay'>
            <div className='reservation-info'>
                <p className='pricing'>
                    <span className='nightly-price'>${price}</span> night
                </p>
                <button onClick={() => onOpenDatesModal(RESERVE_DATES_MODAL)} className='btn btn-dates underline'>
                    {utilService.formatDateRange({ checkIn: reserveBy.checkIn, checkOut: reserveBy.checkOut })}
                </button>
            </div>
            <CtaBtn onClickCB={onReserveStay} txt={'Reserve'} />
        </section>
    )
}
