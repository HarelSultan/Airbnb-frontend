export function StayAttributes() {
    const attributes = [
        {
            header: 'Dedicated workspace',
            desc: `private room with wifi that's well-suited for working.`,
            imgUrl: 'https://res.cloudinary.com/dotasvsuv/image/upload/v1680443408/pkgmtfs8mweudh84eab4.svg',
        },
        {
            header: 'Self check-in',
            desc: `Check yourself in with the lockbox.`,
            imgUrl: 'https://res.cloudinary.com/dotasvsuv/image/upload/v1680443516/t7nt7ep5fz3xcjhxijyz.svg',
        },
        {
            header: 'Free cancellation for 48 hours.',
            desc: '',
            imgUrl: 'https://res.cloudinary.com/dotasvsuv/image/upload/v1680443468/pvy86sktbcwuay1tufpp.svg',
        },
    ]

    return (
        <section className='stay-attributes'>
            {attributes.map(attr => (
                <div key={attr.header} className='attribute-container'>
                    <div className='attribute-img-wrapper'>
                        <img src={attr.imgUrl} alt='' />
                    </div>
                    <div className='attribute-desc'>
                        <h4>{attr.header}</h4>
                        {attr.desc && <p>{attr.desc}</p>}
                    </div>
                </div>
            ))}
        </section>
    )
}
