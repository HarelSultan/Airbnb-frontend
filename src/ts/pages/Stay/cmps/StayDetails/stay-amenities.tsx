import { AMENITIES_MODAL } from '../../stay-page'

interface Props {
    amenities: string[]
    onOpenModal: (expandedModal: string) => void
}

export function StayAmenities({ amenities, onOpenModal }: Props) {
    // const amenitiesToDisplay = amenities.slice(0, 5)
    const amenitiesToDisplay = [
        {
            title: 'City skyline view',
            imgUrl: 'https://res.cloudinary.com/dotasvsuv/image/upload/v1684334537/ud6oxpm3vkij4pmgnafw.svg',
        },
        {
            title: 'Garden view',
            imgUrl: 'https://res.cloudinary.com/dotasvsuv/image/upload/v1684334581/lctw6bdyieoeih8ulww0.svg',
        },
        {
            title: 'Bathtub',
            imgUrl: 'https://res.cloudinary.com/dotasvsuv/image/upload/v1684334624/tteb0jf3m04hbc1hc0yo.svg',
        },
        {
            title: 'Ethernet connection',
            imgUrl: 'https://res.cloudinary.com/dotasvsuv/image/upload/v1684334489/n0dxa3txfsal7rqnv1um.svg',
        },
        {
            title: 'Washer',
            imgUrl: 'https://res.cloudinary.com/dotasvsuv/image/upload/v1684334710/wk0phydka6jhjzdqmkno.svg',
        },
        {
            title: 'Dryer',
            imgUrl: 'https://res.cloudinary.com/dotasvsuv/image/upload/v1684334732/d8ub2ltpnjnegsskjr8k.svg',
        },
    ]

    return (
        <section className='stay-amenities'>
            <h3>What this place offers</h3>
            {/* <div className='amenities-container'>
                {amenitiesToDisplay.map(amenity => (
                    <div key={amenity} className='amenity-wrapper'>
                        <span>{amenity}</span>
                    </div>
                ))}
            </div> */}
            <div className='amenities-container'>
                {amenitiesToDisplay.map(amenity => (
                    <div key={amenity.title} className='amenity-wrapper'>
                        <img src={amenity.imgUrl} alt={`${amenity} image`} />
                        <span>{amenity.title}</span>
                    </div>
                ))}
            </div>

            <button onClick={() => onOpenModal(AMENITIES_MODAL)} className='btn btn-more-amenities'>
                Show all {amenities.length} amenities
            </button>
        </section>
    )
}
