import { FaSearch } from 'react-icons/fa'

export function SearchTeaser() {
    return (
        <div className='search-teaser flex'>
            <button className='btn btn-location'>
                <span className='divider'>Anywhere</span>
            </button>
            <button className='btn btn-date'>
                <span className='divider'>Any week</span>
            </button>
            <button className='btn btn-guests'>
                <span>Add guests</span>
            </button>
            <button className='btn search-wrapper flex flex-center'>
                <FaSearch />
            </button>
        </div>
    )
}
