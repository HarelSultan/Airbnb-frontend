import GoogleMapReact from 'google-map-react'
import { MdHome } from 'react-icons/md'

interface Props {
    lat: number
    lng: number
}

const MapMarker = ({ text }: any) => (
    <div className='map-marker'>
        <MdHome />
    </div>
)

export function Map({ lat, lng }: Props) {
    const mapProps = {
        center: {
            lat,
            lng,
        },
        zoom: 14,
    }

    return (
        <div className='map-wrapper'>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyCl84V5HhaYpXpF0C_et_OYStOFmNKjz1E' }}
                defaultCenter={mapProps.center}
                defaultZoom={mapProps.zoom}
            >
                <MapMarker {...mapProps.center} />
            </GoogleMapReact>
        </div>
    )
}
