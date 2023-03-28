import { FilterByProps } from '../../../../interfaces/filter-by-interface'

interface Props {
    filterBy: FilterByProps
    onSetFilterBy: (updatedFilter: FilterByProps) => void
}

export function TypeFilter({ filterBy, onSetFilterBy }: Props) {
    const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const { name: field, value, checked } = ev.target
        const updatedTypeFilters = checked
            ? [...filterBy.type, value]
            : filterBy.type.filter(stayType => stayType !== value)
        onSetFilterBy({ ...filterBy, [field]: updatedTypeFilters })
    }

    return (
        <section className='type-filter'>
            <h2 className='filter-title'>Type of place</h2>
            <div className='type-filters-container'>
                <label className='stay-type entire-place'>
                    <input
                        type='checkbox'
                        name='type'
                        value={'Entire home/apt'}
                        checked={filterBy.type.includes('Entire home/apt')}
                        onChange={handleChange}
                    />
                    <div className='type-info-container'>
                        <h4 className='type-title'>Entire place</h4>
                        <p className='type-desc'>A place all to yourself</p>
                    </div>
                </label>
                <label className='stay-type private-room'>
                    <input
                        type='checkbox'
                        name='type'
                        value={'Private room'}
                        checked={filterBy.type.includes('Private room')}
                        onChange={handleChange}
                    />
                    <div className='type-info-container'>
                        <h4 className='type-title'>Private room</h4>
                        <p className='type-desc'>Your own room in a home or a hotel, plus some shared common spaces</p>
                    </div>
                </label>
                <label className='stay-type shared-room'>
                    <input
                        type='checkbox'
                        name='type'
                        value={'Shared room'}
                        checked={filterBy.type.includes('Shared room')}
                        onChange={handleChange}
                    />
                    <div className='type-info-container'>
                        <h4 className='type-title'>Shared room</h4>
                        <p className='type-desc'>A sleeping space and common areas that may be shared with others</p>
                    </div>
                </label>
            </div>
        </section>
    )
}
