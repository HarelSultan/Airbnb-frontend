import { useState } from 'react'
import GoogleMapReact from 'google-map-react'
import { StayProps } from '../../../../interfaces/stay-interface'
import { ImgCarousel } from '../img-carousel'
import { StayPreview } from '../stay-preview'

interface Props {
    stays: StayProps[]
    onStayDetails: (stay: StayProps) => void
    onSaveStay: (ev: React.MouseEvent<HTMLButtonElement>, stay: StayProps) => void
}

interface StayMapMarkerProps {
    stay: StayProps
    onClickCB: (stay: StayProps) => void
    lat: number
    lng: number
}

export function StayMapList({ stays, onStayDetails, onSaveStay }: Props) {
    const [selectedStay, setSelectedStay] = useState<StayProps | null>(null)

    const mapProps = {
        center: {
            lat: 40,
            lng: 40,
        },
        zoom: 2,
    }

    const onOpenStayModal = (stay: StayProps) => {
        if (selectedStay?._id === stay._id) return
        console.log(stay)
        setSelectedStay(stay)
    }

    const onCloseStayModal = () => {
        setSelectedStay(null)
    }

    const StayMapMarker = ({ stay, onClickCB }: StayMapMarkerProps) => (
        <div
        // className={`stay-map-marker ${selectedStay?._id === stay._id ? 'selected' : ''}`}
        // onClick={() => onClickCB(stay)}
        >
            <button
                className={`stay-map-marker ${selectedStay?._id === stay._id ? 'selected' : ''}`}
                onClick={() => onClickCB(stay)}
            >
                ${stay.price}
            </button>

            {selectedStay?._id === stay._id && (
                <div className='stay-modal'>
                    <button onClick={onCloseStayModal} className='btn btn-close-modal'></button>
                    <StayPreview stay={selectedStay} onStayDetails={onStayDetails} onSaveStay={onSaveStay} />
                </div>
            )}
        </div>
    )

    return (
        <section className='stay-map-list full'>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyCl84V5HhaYpXpF0C_et_OYStOFmNKjz1E' }}
                defaultCenter={mapProps.center}
                defaultZoom={mapProps.zoom}
            >
                {stays.map(stay => (
                    <StayMapMarker stay={stay} onClickCB={onOpenStayModal} lat={stay.loc.lat} lng={stay.loc.lng} />
                ))}
            </GoogleMapReact>
        </section>
    )
}
