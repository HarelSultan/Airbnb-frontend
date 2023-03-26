import { SearchByProps } from '../../../interfaces/search-by-interface'

interface Props {
    searchBy: SearchByProps
    onSetSearchBy: (updatedSearchBy: SearchByProps) => void
    selectedSearchModule: string
}

export function SearchGuests({ searchBy, onSetSearchBy, selectedSearchModule }: Props) {
    return <section className='expanded-search-module search-guests'>Guests</section>
}
