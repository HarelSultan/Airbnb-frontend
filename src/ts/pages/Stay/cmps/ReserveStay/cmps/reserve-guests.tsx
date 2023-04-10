import { Counter } from '../../../../../cmps/counter'
import { ReserveByProps } from '../../../../../interfaces/reserve-by-interface'
import { GuestProps } from '../../../../../interfaces/search-by-interface'

interface Props {
    reserveBy: ReserveByProps
    onSetReserveBy: (updatedReservation: ReserveByProps) => void
    onSelectReserveModule: (reserveModule: string | null) => void
}

interface Guest {
    guestType: keyof GuestProps
    desc: string
}

export function ReserveGuests({ reserveBy, onSetReserveBy, onSelectReserveModule }: Props) {
    const handleCounterChange = (changeBy: number, guestType: keyof GuestProps) => {
        const updatedCount = reserveBy.guests[guestType] + changeBy
        const updatedGuestCount = { ...reserveBy.guests, [guestType]: updatedCount }
        onSetReserveBy({ ...reserveBy, guests: updatedGuestCount })
    }

    const onCloseGuestModule = () => {
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
        <section className='expanded-reserve-module reserve-guests guest-module'>
            {guests.map(guest => (
                <div key={guest.guestType}>
                    <h4 className='guest-title'>{guest.guestType}</h4>
                    <p className='guest-desc'>{guest.desc}</p>
                    <Counter
                        guestType={guest.guestType}
                        count={reserveBy.guests[guest.guestType]}
                        handleCounterChange={handleCounterChange}
                    />
                </div>
            ))}
            <button onClick={onCloseGuestModule} className='btn btn-close underline'>
                Close
            </button>
        </section>
    )
}
