import { StayHostProps } from '../../../interfaces/stay-interface'
import { utilService } from '../../../services/util.service'
import { AiFillStar } from 'react-icons/ai'
import { MdVerifiedUser } from 'react-icons/md'
import { FaMedal } from 'react-icons/fa'

interface Props {
    host: StayHostProps
}

export function StayHost({ host }: Props) {
    const hostFirstName = utilService.getFirstName(host.fullname)

    return (
        <section className='stay-host'>
            <div className='host-details-container'>
                <img src={host.imgUrl} />
                <div className='host-details'>
                    <h2>Hosted by {hostFirstName}</h2>
                    <p>Joined in June 2014</p>
                </div>
            </div>
            <div className='host-attrs'>
                <AiFillStar className='reviews' />
                <span>278 Reviews</span>
                <MdVerifiedUser className='verified' />
                <span>Identity verified</span>
                {host.isSuperHost && (
                    <div className='super-host-attr '>
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
            <button className='btn btn-contact'>Contact Host</button>
            <div className='disclaimer'>
                <img
                    src='https://res.cloudinary.com/dotasvsuv/image/upload/v1681055703/alpi2hzv1xb1i3q5hefe.svg'
                    alt=''
                />
                <p>
                    To protect your payment, never transfer money or communicate outside of the Airbnb website or app.
                </p>
            </div>
        </section>
    )
}
