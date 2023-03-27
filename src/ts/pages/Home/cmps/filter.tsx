import { stayService } from '../../../services/stay.service'
import { useState } from 'react'
import { GrFormPrevious, GrFormNext } from 'react-icons/gr'
import { LabelFilter } from './Filter/label-filter'
import { FilterByProps } from '../../../interfaces/filter-by-interface'

const labelFilters = stayService.getLabelFilters()

export function Filter() {
    const [filterBy, setFilterBy] = useState<FilterByProps>(stayService.getDefaultFilterProps())

    const onSelectLabelFilter = (selectedLabel: string) => {}

    const labelFilterProps = {
        labelFilters,
        selectedLabelFilter: filterBy.label,
        onSelectLabelFilter,
    }

    return (
        <section className='filter'>
            <LabelFilter {...labelFilterProps} />
            <button className='btn btn-filters'>
                <svg
                    viewBox='0 0 16 16'
                    xmlns='http://www.w3.org/2000/svg'
                    aria-hidden='true'
                    role='presentation'
                    focusable='false'
                >
                    <path d='M5 8c1.306 0 2.418.835 2.83 2H14v2H7.829A3.001 3.001 0 1 1 5 8zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm6-8a3 3 0 1 1-2.829 4H2V4h6.17A3.001 3.001 0 0 1 11 2zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z'></path>
                </svg>
                Filters
            </button>
        </section>
    )
}
