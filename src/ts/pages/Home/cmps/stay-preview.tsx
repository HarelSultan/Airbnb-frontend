import { StayProps } from '../../../interfaces/stay-interface'

interface Props {
    stay: StayProps
    onStayDetails: (stayId: string) => void
}

export function StayPreview({ stay, onStayDetails }: Props) {
    return (
        <article className='stay-preview' onClick={() => onStayDetails(stay._id)}>
            <div className='stay-img-wrapper'>
                <img src={stay.imgUrls[0]} />
            </div>
            <h3>{stay.loc.address}</h3>
            <span>{stay.type}</span>
            <span>${stay.price}</span>
        </article>
    )
}
