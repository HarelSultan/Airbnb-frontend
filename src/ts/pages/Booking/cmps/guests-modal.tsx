import { useState } from 'react'

import { ReserveByProps } from '../../../interfaces/reserve-by-interface'
import { GuestProps } from '../../../interfaces/search-by-interface'
import { Counter } from '../../../cmps/counter'

interface Props {
    reserveBy: ReserveByProps
    onSetReserveBy: (updatedReservation: ReserveByProps) => void
    onSetExpandedModal: (expandedModal: null) => void
}

interface Guest {
    guestType: keyof GuestProps
    desc: string
}

export function GuestsModal({ reserveBy, onSetReserveBy, onSetExpandedModal }: Props) {
    const [guestCount, setGuestCount] = useState<GuestProps>({ ...reserveBy.guests })

    const handleCounterChange = (changeBy: number, guestType: keyof GuestProps) => {
        setGuestCount(prevCount => {
            const updatedCount = prevCount[guestType] + changeBy
            return { ...prevCount, [guestType]: updatedCount }
        })
    }

    const onSetGuestCount = () => {
        onSetReserveBy({ ...reserveBy, guests: guestCount })
        onSetExpandedModal(null)
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
        <section className='guests-modal'>
            {guests.map(guest => (
                <div className='guest-wrapper' key={guest.guestType}>
                    <h4 className='guest-title'>{guest.guestType}</h4>
                    <p className='guest-desc'>{guest.desc}</p>
                    <Counter
                        type={guest.guestType}
                        count={guestCount[guest.guestType]}
                        handleGuestCounterChange={handleCounterChange}
                    />
                </div>
            ))}
            <div className='modal-footer'>
                <button onClick={() => onSetExpandedModal(null)} className='btn btn-cancel underline'>
                    Cancel
                </button>
                <button onClick={() => onSetGuestCount()} className='btn btn-save'>
                    Save
                </button>
            </div>
        </section>
    )
}
