import { FaSearch } from 'react-icons/fa'

interface Props {
    onToggleSearchDisplay: () => void
    onSelectSearchModule: (searchModule: string) => void
}

export function SearchTeaser({ onToggleSearchDisplay, onSelectSearchModule }: Props) {
    return (
        <div className='search-teaser flex' onClick={onToggleSearchDisplay}>
            <button className='btn btn-location' onClick={() => onSelectSearchModule('searchDestination')}>
                <span className='divider'>Anywhere</span>
            </button>
            <button className='btn btn-date' onClick={() => onSelectSearchModule('searchCheckInDate')}>
                <span className='divider'>Any week</span>
            </button>
            <button className='btn btn-guests' onClick={() => onSelectSearchModule('guests')}>
                <span>Add guests</span>
            </button>
            <button className='btn search-wrapper flex flex-center'>
                <FaSearch />
            </button>
        </div>
    )
}
