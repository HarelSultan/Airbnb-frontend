interface Props {
    nightlyPrice: number
    nightsCount: number
}

export function PricingSummary({ nightlyPrice, nightsCount }: Props) {
    const nightsPricing = nightlyPrice * nightsCount
    const cleaningFee = nightsCount * 34
    const airbnbFee = Math.round(nightsPricing * 0.86)
    const totalPrice = nightsPricing + cleaningFee + airbnbFee
    return (
        <section className='pricing-summary'>
            <div className='nights-pricing'>
                <p className='underline'>
                    ${nightlyPrice} x {nightsCount} nights
                </p>
                <span>${nightsPricing}</span>
            </div>
            <div className='cleanning-fee'>
                <p className='underline'>Cleaning fee</p>
                <span>${cleaningFee}</span>
            </div>
            <div className='air-bnb-fee'>
                <p className='underline'>Airbnb service fee</p>
                <span>${airbnbFee}</span>
            </div>
            <div className='total-price'>
                <p>Total</p>
                <span>${totalPrice}</span>
            </div>
        </section>
    )
}
