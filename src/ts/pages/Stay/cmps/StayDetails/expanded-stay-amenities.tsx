import { memo } from 'react'
export const ExpandedStayAmenities = memo(function ExpandedStayAmenities() {
    const scenicViews = [
        {
            title: 'City skyline view',
            imgUrl: 'https://res.cloudinary.com/dotasvsuv/image/upload/v1684334537/ud6oxpm3vkij4pmgnafw.svg',
        },
        {
            title: 'Garden view',
            imgUrl: 'https://res.cloudinary.com/dotasvsuv/image/upload/v1684334581/lctw6bdyieoeih8ulww0.svg',
        },
    ]

    const bathroom = [
        {
            title: 'Bathtub',
            imgUrl: 'https://res.cloudinary.com/dotasvsuv/image/upload/v1684334624/tteb0jf3m04hbc1hc0yo.svg',
        },
        {
            title: 'Hair dryer',
            imgUrl: 'https://res.cloudinary.com/dotasvsuv/image/upload/v1684334649/d5bdobzsnnyz0gyddk8i.svg',
        },
        {
            title: 'Shampoo',
            imgUrl: 'https://res.cloudinary.com/dotasvsuv/image/upload/v1684334667/jymh0vyukp6ga0mkwttv.svg',
        },
        {
            title: 'Body soap',
            imgUrl: 'https://res.cloudinary.com/dotasvsuv/image/upload/v1684334692/bocjn28rbvjmjf5luarg.svg',
        },
    ]

    const bedroomAndLaundry = [
        {
            title: 'Washer',
            imgUrl: 'https://res.cloudinary.com/dotasvsuv/image/upload/v1684334710/wk0phydka6jhjzdqmkno.svg',
        },
        {
            title: 'Dryer',
            imgUrl: 'https://res.cloudinary.com/dotasvsuv/image/upload/v1684334732/d8ub2ltpnjnegsskjr8k.svg',
        },
        {
            title: 'Essentials',
            imgUrl: 'https://res.cloudinary.com/dotasvsuv/image/upload/v1684334766/lhkklbjskukhf1anniv9.svg',
            subText: 'Towels, bed sheets, soap, and toilet paper',
        },
        {
            title: 'Hangers',
            imgUrl: 'https://res.cloudinary.com/dotasvsuv/image/upload/v1684334744/ty33lj0gqocb2bxdazza.svg',
        },
        {
            title: 'Bed linens',
            imgUrl: 'https://res.cloudinary.com/dotasvsuv/image/upload/v1684334781/sgr39my58rvv8rxfyarr.svg',
        },
        {
            title: 'Extra pillows and blankets',
            imgUrl: 'https://res.cloudinary.com/dotasvsuv/image/upload/v1684334798/nz7ynpowi3umyz8nqwo8.svg',
        },
        {
            title: 'Iron',
            imgUrl: 'https://res.cloudinary.com/dotasvsuv/image/upload/v1684334821/jqrzae8brbuwspdwwsso.svg',
        },
    ]

    const entertainment = [
        {
            title: 'TV with standard cable',
            imgUrl: 'https://res.cloudinary.com/dotasvsuv/image/upload/v1684334115/rbrkyyfbj5wunsft6uda.svg',
        },
        {
            title: 'Ethernet connection',
            imgUrl: 'https://res.cloudinary.com/dotasvsuv/image/upload/v1684334489/n0dxa3txfsal7rqnv1um.svg',
        },
    ]

    const heatingAndColling = [
        {
            title: 'Air conditioning',
            imgUrl: 'https://res.cloudinary.com/dotasvsuv/image/upload/v1684334849/b4hrgnqgij4wm4vkjwr7.svg',
        },
        {
            title: 'Indoor fireplace',
            imgUrl: 'https://res.cloudinary.com/dotasvsuv/image/upload/v1684334863/cjznxniz28aorlcqifrt.svg',
        },
        {
            title: 'Heating',
            imgUrl: 'https://res.cloudinary.com/dotasvsuv/image/upload/v1684334880/yafoo8qqxixsherjbj18.svg',
        },
    ]

    return (
        <section className='expanded-stay-amenities'>
            <h2>What this place offers</h2>
            <div className='amenities-category'>
                <h3>Scenic views</h3>
                {scenicViews.map(amenity => (
                    <div key={amenity.title} className='amenity-wrapper'>
                        <img src={amenity.imgUrl} alt={`${amenity} image`} />
                        <span>{amenity.title}</span>
                    </div>
                ))}
            </div>

            <div className='amenities-category'>
                <h3>Bathroom</h3>
                {bathroom.map(amenity => (
                    <div key={amenity.title} className='amenity-wrapper'>
                        <img src={amenity.imgUrl} alt={`${amenity} image`} />
                        <span>{amenity.title}</span>
                    </div>
                ))}
            </div>

            <div className='amenities-category'>
                <h3>Bedroom and laundry</h3>
                {bedroomAndLaundry.map(amenity => (
                    <div key={amenity.title} className='amenity-wrapper'>
                        <img src={amenity.imgUrl} alt={`${amenity} image`} />
                        <span>{amenity.title}</span>
                    </div>
                ))}
            </div>
            <div className='amenities-category'>
                <h3>Entertainment</h3>
                {entertainment.map(amenity => (
                    <div key={amenity.title} className='amenity-wrapper'>
                        <img src={amenity.imgUrl} alt={`${amenity} image`} />
                        <span>{amenity.title}</span>
                    </div>
                ))}
            </div>
            <div className='amenities-category'>
                <h3>Heating and cooling</h3>
                {heatingAndColling.map(amenity => (
                    <div key={amenity.title} className='amenity-wrapper'>
                        <img src={amenity.imgUrl} alt={`${amenity} image`} />
                        <span>{amenity.title}</span>
                    </div>
                ))}
            </div>
        </section>
    )
})
