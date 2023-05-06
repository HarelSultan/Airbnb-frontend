import { CtaBtn } from '../../cmps/cta-btn'

interface Props {
    isMobile: boolean
    onSearchTrips: () => void
}

export function NoTrips({ isMobile, onSearchTrips }: Props) {
    return (
        <section className='no-trips'>
            <div className='no-trips-cta'>
                <img
                    src='https://res.cloudinary.com/dotasvsuv/image/upload/v1683368920/njgumflkjhha0uikagex.svg'
                    alt='highfive'
                />
                <h4>No trips booked...yet!</h4>
                <p>Time to dust off your bags and start planning your next adventure</p>
                <CtaBtn onClickCB={onSearchTrips} txt={'Start searching'} />
            </div>
            {!isMobile && (
                <img
                    className='vacation-img'
                    src='https://res.cloudinary.com/dotasvsuv/image/upload/v1683368972/plwteagf6hbfxfyrpdjc.webp'
                    alt='Vacation image'
                />
            )}
        </section>
    )
}
