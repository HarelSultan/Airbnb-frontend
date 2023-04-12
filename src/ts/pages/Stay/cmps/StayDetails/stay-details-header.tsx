import { StayDetailsProps, StayHostProps } from '../../../../interfaces/stay-interface'
import { utilService } from '../../../../services/util.service'

interface Props {
    host: StayHostProps
    details: StayDetailsProps
    roomType: string
}

export function StayDetailsHeader({ host, details, roomType }: Props) {
    return (
        <section className='stay-details-header'>
            <div className='wrapper'>
                <h3>
                    {roomType} hosted by {utilService.getFirstName(host.fullname)}
                </h3>
                <div className='stay-capacity'>
                    {utilService.formatPlural(details.guests, ' guest')} ·{' '}
                    {utilService.formatPlural(details.bedrooms, ' bedroom')} ·{' '}
                    {utilService.formatPlural(details.beds, ' bed')} ·{' '}
                    {utilService.formatPlural(details.bathrooms, ' bath')}
                </div>
            </div>
            <div className='host-img-wrapper'>
                <img src={host.imgUrl} />
            </div>
        </section>
    )
}
