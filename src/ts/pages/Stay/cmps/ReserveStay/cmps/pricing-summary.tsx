import { AIRBNB_SERVICE_MODAL, CLEANING_FEE_MODAL, PRICE_BREAKDOWN_MODAL } from '../../../stay-page'

interface Props {
    nightlyPrice: number
    nightsCount: number
    onOpenPriceModal?: (expandedModal: string) => void
}

export function PricingSummary({ nightlyPrice, nightsCount, onOpenPriceModal }: Props) {
    const nightsPricing = nightlyPrice * nightsCount
    const cleaningFee = nightsCount * 34
    const airbnbFee = Math.round(nightsPricing * 0.86)
    const totalPrice = nightsPricing + cleaningFee + airbnbFee
    return (
        <section className='pricing-summary'>
            <div className='nights-pricing'>
                <p
                    onClick={onOpenPriceModal ? () => onOpenPriceModal(PRICE_BREAKDOWN_MODAL) : undefined}
                    className='underline'
                >
                    ${nightlyPrice} x {nightsCount} nights
                </p>
                <span>${nightsPricing}</span>
            </div>
            <div className='cleanning-fee'>
                <p
                    onClick={onOpenPriceModal ? () => onOpenPriceModal(CLEANING_FEE_MODAL) : undefined}
                    className='underline'
                >
                    Cleaning fee
                </p>
                <span>${cleaningFee}</span>
            </div>
            <div className='air-bnb-fee'>
                <p
                    onClick={onOpenPriceModal ? () => onOpenPriceModal(AIRBNB_SERVICE_MODAL) : undefined}
                    className='underline'
                >
                    Airbnb service fee
                </p>
                <span>${airbnbFee}</span>
            </div>
            <div className='total-price'>
                <p>Total</p>
                <span>${totalPrice}</span>
            </div>
        </section>
    )
}
