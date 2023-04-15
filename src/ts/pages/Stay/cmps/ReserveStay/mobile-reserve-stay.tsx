import { utilService } from '../../../../services/util.service'
import { ReserveByProps } from '../../../../interfaces/reserve-by-interface'
import { CtaBtn } from '../../../../cmps/cta-btn'
interface Props {
    price: number
    reserveBy: ReserveByProps
    onReserveStay: () => void
}

export function MobileReserveStay({ price, reserveBy, onReserveStay }: Props) {
    return (
        <section className='full mobile-reserve-stay'>
            <div className='reservation-info'>
                <p className='pricing'>
                    <span className='nightly-price'>${price}</span> night
                </p>
                <p className='dates underline'>
                    {utilService.formatDateRange({ checkIn: reserveBy.checkIn, checkOut: reserveBy.checkOut })}
                </p>
            </div>
            <CtaBtn onClickCB={onReserveStay} txt={'Reserve'} />
        </section>
    )
}
