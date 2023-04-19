import { StayProps } from '../../../interfaces/stay-interface'
import { StayPreview } from './stay-preview'

interface Props {
    stays: StayProps[]
    onStayDetails: (stay: StayProps) => void
    onToggleSaveStay: (ev: React.MouseEvent<HTMLButtonElement>, stay: StayProps) => void
    wishList: string[]
}

export function StayList({ stays, onStayDetails, onToggleSaveStay, wishList }: Props) {
    return (
        <section className='stay-list'>
            {stays.map(stay => (
                <StayPreview
                    stay={stay}
                    onStayDetails={onStayDetails}
                    key={stay._id}
                    onToggleSaveStay={onToggleSaveStay}
                    wishList={wishList}
                />
            ))}
        </section>
    )
}
