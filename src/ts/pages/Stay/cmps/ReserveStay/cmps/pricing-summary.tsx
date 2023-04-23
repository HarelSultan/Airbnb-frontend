import { AIRBNB_SERVICE_MODAL, CLEANING_FEE_MODAL, PRICE_BREAKDOWN_MODAL } from '../../../stay-page'

interface Props {
    nightlyPrice: number
    nightsCount: number
    onOpenPriceModal: (expandedModal: string) => void
}

export function PricingSummary({ nightlyPrice, nightsCount, onOpenPriceModal }: Props) {
    const nightsPricing = nightlyPrice * nightsCount
    const cleaningFee = nightsCount * 34
    const airbnbFee = Math.round(nightsPricing * 0.86)
    const totalPrice = nightsPricing + cleaningFee + airbnbFee
    return (
        <section className='pricing-summary'>
            <div className='nights-pricing'>
                <button onClick={() => onOpenPriceModal(PRICE_BREAKDOWN_MODAL)} className='btn underline'>
                    ${nightlyPrice} x {nightsCount} nights
                </button>
                <span>${nightsPricing}</span>
            </div>
            <div className='cleanning-fee'>
                <button
                    onClick={onOpenPriceModal ? () => onOpenPriceModal(CLEANING_FEE_MODAL) : undefined}
                    className='btn underline'
                >
                    Cleaning fee
                </button>
                <span>${cleaningFee}</span>
            </div>
            <div className='air-bnb-fee'>
                <button
                    onClick={onOpenPriceModal ? () => onOpenPriceModal(AIRBNB_SERVICE_MODAL) : undefined}
                    className='btn underline'
                >
                    Airbnb service fee
                </button>
                <span>${airbnbFee}</span>
            </div>
            <div className='total-price'>
                <p>Total</p>
                <span>${totalPrice}</span>
            </div>
        </section>
    )
}
