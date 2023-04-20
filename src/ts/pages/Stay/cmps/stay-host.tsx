import { StayHostProps } from '../../../interfaces/stay-interface'
import { utilService } from '../../../services/util.service'
import { AiFillStar } from 'react-icons/ai'
import { MdVerifiedUser } from 'react-icons/md'
import { FaMedal } from 'react-icons/fa'
import { CONTACT_HOST_MODAL } from '../stay-page'

interface Props {
    host: StayHostProps
    onOpenContactHostModal: (expandedModal: string) => void
}

export function StayHost({ host, onOpenContactHostModal }: Props) {
    const hostFirstName = utilService.getFirstName(host.fullname)

    return (
        <section className='stay-host'>
            <div className='host-details-container'>
                <div className='host-details'>
                    <h2>Hosted by {hostFirstName}</h2>
                    <p>Joined in June 2014</p>
                </div>
                <img src={host.imgUrl} />
            </div>
            <div className='host-attrs'>
                <div className='attr-wrapper flex'>
                    <AiFillStar className='reviews' />
                    <span>278 Reviews</span>
                </div>
                <div className='attr-wrapper flex'>
                    <MdVerifiedUser className='verified' />
                    <span>Identity verified</span>
                </div>
                {host.isSuperHost && (
                    <div className='attr-wrapper  flex align-center'>
                        <FaMedal />
                        <span>Superhost</span>
                    </div>
                )}
            </div>
            {host.isSuperHost && (
                <div className='super-host'>
                    <h4>{hostFirstName} is a Superhost</h4>
                    <p>
                        Superhosts are experienced, highly rated hosts who are committed to providing great stays for
                        guests.
                    </p>
                </div>
            )}
            <p className='response-rate'>Response rate: 100%</p>
            <p>Response time: within an hour</p>
            <button onClick={() => onOpenContactHostModal(CONTACT_HOST_MODAL)} className='btn btn-contact'>
                Contact Host
            </button>
            <div className='disclaimer'>
                <p>
                    To protect your payment, never transfer money or communicate outside of the Airbnb website or app.
                </p>
                <img
                    src='https://res.cloudinary.com/dotasvsuv/image/upload/v1681055703/alpi2hzv1xb1i3q5hefe.svg'
                    alt=''
                />
            </div>
        </section>
    )
}
