import { BsDash } from 'react-icons/bs'
import { FilterByProps } from '../../../../interfaces/filter-by-interface'

interface Props {
    filterBy: FilterByProps
    onSetFilterBy: (updatedFilter: FilterByProps) => void
}

export function PriceFilter({ filterBy, onSetFilterBy }: Props) {
    const handlePriceChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name: field } = ev.target
        const updatedFilter: FilterByProps = { ...filterBy, [field]: value }
        onSetFilterBy(updatedFilter)
    }

    return (
        <div className='price-filter'>
            <h2 className='filter-title'>Price range</h2>
            <p className='filter-sub-title'>The average nightly price is $254 </p>
            <div className='price-range-wrapper'>
                <label className='min-price'>
                    <p>min price</p>
                    <span className='currency'>$</span>
                    <input
                        type='number'
                        name='minPrice'
                        value={filterBy.minPrice}
                        onChange={handlePriceChange}
                        min={10}
                        max={1400}
                    />
                </label>
                <p className='dash'>
                    <BsDash />
                </p>
                <label className='max-price'>
                    <p>max price</p>
                    <span className='currency'>$</span>
                    <input
                        type='number'
                        name='maxPrice'
                        value={filterBy.maxPrice}
                        onChange={handlePriceChange}
                        min={10}
                        max={1400}
                    />
                </label>
            </div>
        </div>
    )
}
