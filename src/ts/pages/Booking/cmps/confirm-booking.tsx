import { CtaBtn } from '../../../cmps/cta-btn'
import { UserProps } from '../../../interfaces/user-interface'
import { utilService } from '../../../services/util.service'

interface Props {
    isMobile: boolean
    loggedInUser: UserProps
    checkIn: Date
    onCompleteReservation: () => void
}

export function ConfirmBooking({ isMobile, loggedInUser, checkIn, onCompleteReservation }: Props) {
    const lastCancellationDate = new Date(checkIn)
    lastCancellationDate.setDate(checkIn.getDate() - 1)

    return (
        <section className={`confirm-booking ${isMobile ? 'main-layout secondary-layout full' : ''}`}>
            <div className='confirm-booking-header'>
                <h2>{`Hi ${utilService.getFirstName(loggedInUser.fullName)}, you're logged in`}</h2>
                <p>Review your booking details to continue.</p>
            </div>
            {isMobile && <div className='seperator full'></div>}

            <div className='cancellation'>
                <h2>Cancellation policy</h2>
                <p className='cancellation-time-limit'>
                    Free cancellation before {utilService.formatDate(lastCancellationDate)}.
                </p>
                <p>
                    Review the Host’s full cancellation policy which applies even if you cancel for illness or
                    disruptions caused by COVID-19.
                </p>
            </div>

            {isMobile && <div className='seperator full'></div>}

            <div className='ground-rules'>
                <h2>Ground rules</h2>
                <p>We ask every guest remember a few simple things about what makes a great guest.</p>
                <ul>
                    <li>
                        <span> Follow the house rules</span>
                    </li>
                    <li>
                        <span>Treat your Host's home like your own</span>
                    </li>
                </ul>
            </div>
            {isMobile && <div className='seperator full'></div>}

            <small className='terms-agreement'>
                By selecting the button below, I agree to the Host's House Rules, Ground rules for guests, Airbnb's
                Refund Policy, and that Airbnb can charge my payment method if I’m responsible for damage.
            </small>
            <CtaBtn onClickCB={onCompleteReservation} txt={'Confirm and pay'} />
        </section>
    )
}
