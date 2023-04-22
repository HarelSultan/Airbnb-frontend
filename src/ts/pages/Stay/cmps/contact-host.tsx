import { FormEventHandler, useState } from 'react'

import { StayHostProps } from '../../../interfaces/stay-interface'
import { utilService } from '../../../services/util.service'

interface Props {
    host: StayHostProps
    amenities: string[]
    onSendHostMessage: (msg: string) => void
}

export function ContactHost({ host, amenities, onSendHostMessage }: Props) {
    const hostFirstName = utilService.getFirstName(host.fullname)

    const [hostMessage, setHostMessage] = useState<string>('')

    const handleChange = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
        setHostMessage(ev.target.value)
    }

    const onSendMessage = () => {
        hostMessage && onSendHostMessage(hostMessage)
    }

    return (
        <section className='contact-host'>
            <div className='host-details-container'>
                <div className='host-details'>
                    <h2>Hosted by {hostFirstName}</h2>
                    <p>Typically responds within an hour</p>
                </div>
                <img src={host.imgUrl} />
            </div>
            <div className='common-question'>
                <h2>Most travelers ask about</h2>
                <div className='getting-there'>
                    <h4>Getting there</h4>
                    <ul>
                        <li>
                            {amenities.includes('Free parking on premises')
                                ? 'Free parking on premises'
                                : 'No parking on property'}
                            .
                        </li>
                        <li>Check-in time for this home starts at 4:00 PM and checkout is at 11:00 AM.</li>
                    </ul>
                </div>
                <div className='house-rules'>
                    <h4>House details and rules</h4>
                    <ul>
                        <li>{amenities.includes('Pets allowed') ? 'Pets allowed' : 'No pets'}.</li>
                        <li>{amenities.includes('Smoking allowed') ? 'Smoking allowed' : 'No smoking'}.</li>
                    </ul>
                </div>
                <div className='price'>
                    <h4>Price and availability</h4>
                    <ul>
                        <li>Get a 10% discount on stays longer than a week.</li>
                        <li>
                            Full refund for cancellations up to 30 days before check-in. If booked fewer than 30 days
                            before check-in, full refund for cancellations made 24 hours before check-in. No refund
                            after that.
                        </li>
                    </ul>
                </div>
            </div>

            <div className='message-wrapper'>
                <h3>Message the host</h3>
                <textarea value={hostMessage} onChange={handleChange} required />
                <button onClick={onSendMessage} className='btn btn-send'>
                    Send message
                </button>
            </div>
        </section>
    )
}
