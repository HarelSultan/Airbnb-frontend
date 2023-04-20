import GoogleMapReact from 'google-map-react'
import { LOCATION_MODAL } from '../stay-page'
import { MdHome } from 'react-icons/md'
import { GrFormNext } from 'react-icons/gr'

interface Props {
    lat: number
    lng: number
    stayArea: string
    staySummary: string
    onOpenLocationModal?: (expandedModal: string) => void
}

const MapMarker = ({ text }: any) => (
    <div className='map-marker'>
        <MdHome />
    </div>
)

export function StayMap({ lat, lng, stayArea, staySummary, onOpenLocationModal }: Props) {
    const mapProps = {
        center: {
            lat,
            lng,
        },
        zoom: 14,
    }

    const staySummaryToDisplay = onOpenLocationModal ? staySummary.slice(0, staySummary.indexOf('.') + 1) : staySummary

    return (
        <section className='stay-map'>
            <h2>Where you'll be</h2>
            <div className='map-wrapper'>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyCl84V5HhaYpXpF0C_et_OYStOFmNKjz1E' }}
                    defaultCenter={mapProps.center}
                    defaultZoom={mapProps.zoom}
                >
                    <MapMarker {...mapProps.center} />
                </GoogleMapReact>
            </div>
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
// bootstrapURLKeys={{ key: 'AIzaSyCl84V5HhaYpXpF0C_et_OYStOFmNKjz1E' }}
