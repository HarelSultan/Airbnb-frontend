import { StayProps } from '../../../../interfaces/stay-interface'
import { StayDetailsHeader } from './stay-details-header'

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
        </section>
    )
}
