import { StayProps } from '../../../../interfaces/stay-interface'
import { StayAirCover } from './stay-air-cover'
import { StayAmenities } from './stay-amenities'
import { StayAttributes } from './stay-attributes'
import { StayDetailsHeader } from './stay-details-header'
import { StaySleepingArrangement } from './stay-sleeping-arrangement'
import { StaySummary } from './stay-summary'

interface Props {
    stay: StayProps
}

export function StayDetails({ stay }: Props) {
    const stayDetailsHeaderProps = {
        host: stay.host,
        details: stay.stayDetails,
        roomType: stay.roomType,
    }

    return (
        <section className='stay-details'>
            <StayDetailsHeader {...stayDetailsHeaderProps} />
            <StayAttributes />
            <StayAirCover />
            <StaySummary summary={stay.summary} />
            <StaySleepingArrangement details={stay.stayDetails} />
            <StayAmenities amenities={stay.amenities} />
        </section>
    )
}
