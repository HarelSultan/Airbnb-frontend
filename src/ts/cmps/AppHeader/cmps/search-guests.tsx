import { SearchByProps } from '../../../interfaces/search-by-interface'
import { GuestProps } from '../../../interfaces/search-by-interface'
import { Counter } from '../../counter'

interface Props {
    searchBy: SearchByProps
    onSetSearchBy: (updatedSearchBy: SearchByProps) => void
}

interface Guest {
    guestType: keyof GuestProps
    desc: string
}

export function SearchGuests({ searchBy, onSetSearchBy }: Props) {
    const handleCounterChange = (changeBy: number, guestType: keyof GuestProps) => {
        const updatedCount = searchBy.guests[guestType] + changeBy
        const updatedGuestCount = { ...searchBy.guests, [guestType]: updatedCount }
        onSetSearchBy({ ...searchBy, guests: updatedGuestCount })
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
