import { SearchByProps } from '../../../interfaces/search-by-interface'
import flexibleImg from '../../../../assets/img/flexible.jpg'
import middleEastImg from '../../../../assets/img/middle-east.webp'
import italyImg from '../../../../assets/img/italy.webp'
import southAmericaImg from '../../../../assets/img/south-america.webp'
import franceImg from '../../../../assets/img/france.webp'
import unitedStatesImg from '../../../../assets/img/united-states.webp'

interface Props {
    searchBy: SearchByProps
    onSetSearchBy: () => void
}

export function SearchDestination({ searchBy, onSetSearchBy }: Props) {
    const destinations = [
        {
            title: `I'm Flexible`,
            imgSrc: flexibleImg,
        },
        {
            title: 'Middle East',
            imgSrc: middleEastImg,
        },
        {
            title: 'Italy',
            imgSrc: italyImg,
        },
        {
            title: 'South America',
            imgSrc: southAmericaImg,
        },
        {
            title: 'France',
            imgSrc: franceImg,
        },
        {
            title: 'United States',
            imgSrc: unitedStatesImg,
        },
    ]

    return (
        <section className='expanded-search-module search-destination'>
            <h2>Search by region</h2>
            <ol className='clean-list destinations-container'>
                {destinations.map(destination => (
                    <li
                        key={destination.title}
                        className={`destination-wrapper ${searchBy.destination === destination.title ? 'active' : ''}`}
                    >
                        <img src={destination.imgSrc} alt='' />
                        <span>{destination.title}</span>
                    </li>
                ))}
            </ol>
        </section>
    )
}
