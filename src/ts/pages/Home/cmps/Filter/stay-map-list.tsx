import { useState } from 'react'
import GoogleMapReact from 'google-map-react'
import { StayProps } from '../../../../interfaces/stay-interface'
import { StayPreview } from '../stay-preview'
import { AiOutlineClose } from 'react-icons/ai'

interface Props {
    stays: StayProps[]
    onStayDetails: (stay: StayProps) => void
    onToggleSaveStay: (ev: React.MouseEvent<HTMLButtonElement>, stay: StayProps) => void
    wishList: string[]
}

interface StayMapMarkerProps {
    stay: StayProps
    onClickCB: (stay: StayProps) => void
    lat: number
    lng: number
}

export function StayMapList({ stays, onStayDetails, onToggleSaveStay, wishList }: Props) {
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
                    <button onClick={onCloseStayModal} className='btn btn-close-modal'>
                        <AiOutlineClose />
                    </button>
                    <StayPreview
                        stay={selectedStay}
                        onStayDetails={onStayDetails}
                        onToggleSaveStay={onToggleSaveStay}
                        wishList={wishList}
                    />
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
                    <StayMapMarker
                        key={stay._id}
                        stay={stay}
                        onClickCB={onOpenStayModal}
                        lat={stay.loc.lat}
                        lng={stay.loc.lng}
                    />
                ))}
            </GoogleMapReact>
        </section>
    )
}
