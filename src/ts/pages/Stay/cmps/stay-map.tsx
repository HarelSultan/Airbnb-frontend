import GoogleMapReact from 'google-map-react'
import { MdHome } from 'react-icons/md'

interface Props {
    lat: number
    lng: number
    stayArea: string
    staySummary: string
}

const MapMarker = ({ text }: any) => (
    <div className='map-marker'>
        <MdHome />
    </div>
)

export function StayMap({ lat, lng, stayArea, staySummary }: Props) {
    const mapProps = {
        center: {
            lat,
            lng,
        },
        zoom: 14,
    }

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
            <p>{staySummary}</p>
        </section>
    )
}
// bootstrapURLKeys={{ key: 'AIzaSyCl84V5HhaYpXpF0C_et_OYStOFmNKjz1E' }}
