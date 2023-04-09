import { utilService } from '../../../services/util.service'

interface Props {
    amenities: string[]
    guestsCount: number
    checkIn: Date
}

export function StayThingsToKnow({ amenities, guestsCount, checkIn }: Props) {
    const lastCancellationDate = new Date(checkIn)
    lastCancellationDate.setDate(checkIn.getDate() + 1)

    return (
        <section className='stay-things-to-know'>
            <h2>Things to know</h2>
            <div className='things-to-know-container'>
                <div className='house-rules'>
                    <h4>House rules</h4>
                    <p>Check-in after 4:00 PM</p>
                    <p>Checkout before 11:00 AM</p>
                    <p>{amenities.includes('Pets allowed') ? 'Pets allowed' : `${guestsCount} guests maximum`}</p>
                </div>
                <div className='safety'>
                    <h4>Safety & property</h4>
                    <p>{amenities.includes('Smoke detector') ? 'Smoke alarm' : 'No smoke alarm'}</p>
                    <p>
                        Carbon monoxide{' '}
                        {amenities.includes('Carbon monoxide detector') ? 'alarm' : 'detector not required'}
                    </p>
                    <p>
                        {amenities.includes('Free parking on premises')
                            ? 'Free parking on premises'
                            : 'No parking on property'}
                    </p>
                </div>
                <div className='cancellation'>
                    <h4>Cancellation policy</h4>
                    <p>Free cancellation before {utilService.formatDate(lastCancellationDate)}.</p>
                    <p>
                        Review the Host’s full cancellation policy which applies even if you cancel for illness or
                        disruptions caused by COVID-19.
                    </p>
                </div>
            </div>
        </section>
    )
}
