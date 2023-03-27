import { useState, useRef } from 'react'
import { LabelFilterProps } from '../../../../interfaces/filter-by-interface'
import { GrFormNext, GrFormPrevious } from 'react-icons/gr'

interface Props {
    labelFilters: LabelFilterProps[]
    selectedLabelFilter: string
    onSelectLabelFilter: (selectedLabel: string) => void
}

export function LabelFilter({ labelFilters, selectedLabelFilter, onSelectLabelFilter }: Props) {
    const [isFullyScrolledLeft, setIsFullyScrolledLeft] = useState(true)
    const [isFullyScrolledRight, setIsFullyScrolledRight] = useState(false)

    const labelFiltersRef = useRef<HTMLDivElement>(null)

    const onScrollFilters = (direction: number) => {
        if (!labelFiltersRef.current) return
        labelFiltersRef.current.scrollLeft += 450 * direction
        setTimeout(() => {
            setIsFullyScrolled()
        }, 600)
    }

    const setIsFullyScrolled = () => {
        if (!labelFiltersRef.current) return

        setIsFullyScrolledRight(
            Math.round(labelFiltersRef.current.scrollLeft) ===
                Math.round(labelFiltersRef.current.scrollWidth - labelFiltersRef.current.clientWidth)
        )

        setIsFullyScrolledLeft(labelFiltersRef.current.scrollLeft === 0)
    }

    return (
        <div
            className={`label-filter-slider ${isFullyScrolledLeft ? 'left-hidden' : ''} ${
                isFullyScrolledRight ? 'right-hidden' : ''
            }`}
        >
            <div className={`btn-labels-wrapper btn-prev-wrapper ${isFullyScrolledLeft ? 'hidden' : ''}`}>
                <button
                    onClick={() => onScrollFilters(-1)}
                    className={`btn btn-labels btn-prev ${isFullyScrolledLeft ? 'hidden' : ''}`}
                >
                    <GrFormPrevious />
                </button>
            </div>
            <div className='label-filters-container' ref={labelFiltersRef}>
                {labelFilters.map(label => (
                    <div
                        onClick={() => onSelectLabelFilter(label.desc)}
                        key={label.desc}
                        className={`filter-widget ${selectedLabelFilter === label.desc ? 'active' : ''}`}
                    >
                        <img src={label.url} alt={`${label.desc} image`} />
                        <p>{label.desc}</p>
                    </div>
                ))}
            </div>
            <div className={`btn-labels-wrapper btn-next-wrapper ${isFullyScrolledRight ? 'hidden' : ''}`}>
                <button
                    onClick={() => onScrollFilters(1)}
                    className={`btn btn-labels btn-next ${isFullyScrolledRight ? 'hidden' : ''}`}
                >
                    <GrFormNext />
                </button>
            </div>
        </div>
    )
}
