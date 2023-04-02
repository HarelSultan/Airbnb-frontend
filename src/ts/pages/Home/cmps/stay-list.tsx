import { StayProps } from '../../../interfaces/stay-interface'
import { StayPreview } from './stay-preview'

interface Props {
    stays: StayProps[]
    onStayDetails: (stay: StayProps) => void
}

export function StayList({ stays, onStayDetails }: Props) {
    return (
        <section className='stay-list'>
            {stays.map(stay => (
                <StayPreview stay={stay} onStayDetails={onStayDetails} key={stay._id} />
            ))}
        </section>
    )
}
