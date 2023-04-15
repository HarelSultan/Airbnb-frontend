interface Props {
    amenities: string[]
}

export function StayAmenities({ amenities }: Props) {
    const amenitiesToDisplay = amenities.slice(0, 5)

    return (
        <section className='stay-amenities'>
            <h3>What this place offers</h3>
            <div className='amenities-container'>
                {amenitiesToDisplay.map(amenity => (
                    <div key={amenity} className='amenity-wrapper'>
                        <span>{amenity}</span>
                    </div>
                ))}
            </div>
            <button className='btn btn-more-amenities'>Show all {amenities.length} amenities</button>
        </section>
    )
}
