import { Counter } from './counter'
import { ReserveByProps } from '../interfaces/reserve-by-interface'
import { GuestProps, SearchByProps } from '../interfaces/search-by-interface'

interface Props {
    state: SearchByProps | ReserveByProps
    onSetSearchBy?: (updatedSearchBy: SearchByProps) => void
    onSetReserveBy?: (updatedReservation: ReserveByProps) => void
    onSelectReserveModule?: (reserveModule: string | null) => void
}

interface Guest {
    guestType: keyof GuestProps
    desc: string
}

export function GuestCounter({ state, onSetSearchBy, onSetReserveBy, onSelectReserveModule }: Props) {
    const handleCounterChange = (changeBy: number, guestType: keyof GuestProps) => {
        const updatedCount = state.guests[guestType] + changeBy
        const updatedGuestCount = { ...state.guests, [guestType]: updatedCount }
        if (onSetSearchBy) return onSetSearchBy({ ...state, guests: updatedGuestCount } as SearchByProps)
        if (onSetReserveBy) return onSetReserveBy({ ...state, guests: updatedGuestCount } as ReserveByProps)
    }

    const onCloseGuestModule = () => {
        if (!onSelectReserveModule) return
        onSelectReserveModule(null)
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
        <section
            className={`expanded-search-module guest-module ${onSetSearchBy ? 'search-guests' : 'reserve-guests'}`}
        >
            {guests.map(guest => (
                <div key={guest.guestType}>
                    <h4 className='guest-title'>{guest.guestType}</h4>
                    <p className='guest-desc'>{guest.desc}</p>
                    <Counter
                        type={guest.guestType}
                        count={state.guests[guest.guestType]}
                        handleGuestCounterChange={handleCounterChange}
                    />
                </div>
            ))}
            {onSelectReserveModule && (
                <button onClick={onCloseGuestModule} className='btn btn-close underline'>
                    Close
                </button>
            )}
        </section>
    )
}
