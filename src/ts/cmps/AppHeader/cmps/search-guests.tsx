import { SearchByProps } from '../../../interfaces/search-by-interface'
import { searchByGuestProps } from '../../../interfaces/search-by-interface'
import { Counter } from './counter'

interface Props {
    searchBy: SearchByProps
    onSetSearchBy: (updatedSearchBy: SearchByProps) => void
    selectedSearchModule: string
}

export function SearchGuests({ searchBy, onSetSearchBy, selectedSearchModule }: Props) {
    const handleCounterChange = (changeBy: number, guestType: keyof searchByGuestProps) => {
        const updatedCount = searchBy.guests[guestType] + changeBy
        const updatedGuestCount = { ...searchBy.guests, [guestType]: updatedCount }
        onSetSearchBy({ ...searchBy, guests: updatedGuestCount })
    }

    interface Guest {
        guestType: keyof searchByGuestProps
        desc: string
    }

    const guests: Guest[] = [
        {
            guestType: 'adults',
            desc: 'Ages 13 or above',
        },
        {
            guestType: 'children',
            desc: 'Ages 2-12',
        },
        {
            guestType: 'infants',
            desc: 'Under 2',
        },
        {
            guestType: 'pets',
            desc: 'Bringing a service animal?',
        },
    ]

    return (
        <section className='expanded-search-module search-guests'>
            {guests.map(guest => (
                <div key={guest.guestType}>
                    <h4 className='guest-title'>{guest.guestType}</h4>
                    <p className='guest-desc'>{guest.desc}</p>
                    <Counter
                        guestType={guest.guestType}
                        count={searchBy.guests[guest.guestType]}
                        handleCounterChange={handleCounterChange}
                    />
                </div>
            ))}
        </section>
    )
}
{
    /* <div className='adults-counter'>
                <h4 className='guest-title'>Adults</h4>
                <p className='guest-desc'>Ages 13 or above</p>
                <Counter guestType={'adults'} count={searchBy.guests.adults} handleCounterChange={handleCounterChange}/>
            </div>
            <div className='children-counter'>
                <h4 className='guest-title'>Children</h4>
                <p className='guest-desc'>Ages 2-12</p>
            </div>
            <div className='infants-counter'>
                <h4 className='guest-title'>Infants</h4>
                <p className='guest-desc'>Under 2</p>
            </div>
            <div className='pets-counter'>
                <h4 className='guest-title'>Pets</h4>
                <p className='guest-desc'>Bringing a service animal?</p>
            </div> */
}
