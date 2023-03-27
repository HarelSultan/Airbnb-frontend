import { BsDash } from 'react-icons/bs'

export function PriceFilter() {
    return (
        <div className='price-filter'>
            <h2 className='filter-title'>Price range</h2>
            <p className='filter-sub-title'>The average nightly price is $254 </p>
            <div className='price-range-wrapper'>
                <label className='min-price'>
                    <p>min price</p>
                    <span className='currency'>$</span>
                    <input type='number' name='minPrice' min={10} max={1200} />
                </label>
                <p className='dash'>
                    <BsDash />
                </p>
                <label className='max-price'>
                    <p>max price</p>
                    <span className='currency'>$</span>
                    <input type='number' name='maxPrice' min={10} max={1200} />
                </label>
            </div>
        </div>
    )
}
