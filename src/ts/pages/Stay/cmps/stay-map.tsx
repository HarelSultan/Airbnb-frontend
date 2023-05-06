import { LOCATION_MODAL } from '../stay-page'
import { GrFormNext } from 'react-icons/gr'
import { Map } from '../../../cmps/map'

interface Props {
    lat: number
    lng: number
    stayArea: string
    staySummary: string
    onOpenLocationModal?: (expandedModal: string) => void
}

export function StayMap({ lat, lng, stayArea, staySummary, onOpenLocationModal }: Props) {
    const staySummaryToDisplay = onOpenLocationModal ? staySummary.slice(0, staySummary.indexOf('.') + 1) : staySummary

    return (
        <section className='stay-map'>
            <h2>Where you'll be</h2>
            <Map lat={lat} lng={lng} />
            <h4>{stayArea}</h4>
            <p>{staySummaryToDisplay}</p>
            {onOpenLocationModal && (
                <button onClick={() => onOpenLocationModal(LOCATION_MODAL)} className='btn btn-more underline'>
                    Show more
                    <GrFormNext />
                </button>
            )}
        </section>
    )
}
