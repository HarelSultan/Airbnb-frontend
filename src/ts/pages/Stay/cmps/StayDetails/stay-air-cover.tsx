import { AIR_COVER_MODAL } from '../../stay-page'

interface Props {
    onOpenModal: (expandedModal: string) => void
}
export function StayAirCover({ onOpenModal }: Props) {
    return (
        <section className='stay-air-cover'>
            <img
                className='air-cover-img'
                src='https://res.cloudinary.com/dotasvsuv/image/upload/v1680445107/f9axjhl7sxlnhy5owbbw.webp'
                alt=''
            />
            <p className='air-cover-desc'>
                Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues
                like trouble checking in.
            </p>
            <button onClick={() => onOpenModal(AIR_COVER_MODAL)} className='btn btn-more underline'>
                Learn more
            </button>
            {/* <a href='/' target='_' className='underline'>
                Learn more
            </a> */}
        </section>
    )
}
