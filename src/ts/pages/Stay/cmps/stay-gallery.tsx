interface Props {
    imgUrls: string[]
}

export function StayGallery({ imgUrls }: Props) {
    return (
        <section className='stay-gallery'>
            {imgUrls.map(url => (
                <div key={url} className='img-wrapper'>
                    <img src={url} />
                </div>
            ))}
        </section>
    )
}
