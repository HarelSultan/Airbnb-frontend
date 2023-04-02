import { StayDetailsProps } from '../../../../interfaces/stay-interface'

interface Props {
    details: StayDetailsProps
}

export function StaySleepingArrangement({ details }: Props) {
    return (
        <section className='stay-sleeping-arrangement'>
            <h3>Where you'll sleep</h3>
            <div className='bedrooms-wrapper'>
                <div className='bedroom'>
                    <div className='bed-img-wrapper'>
                        <img
                            src='https://res.cloudinary.com/dotasvsuv/image/upload/v1680449086/p5blwp0shmy5a61chpkl.svg'
                            alt='double-bed'
                        />
                    </div>
                    <h4>Bedroom 1</h4>
                    <p>1 double bed</p>
                </div>
                <div className='bedroom'>
                    <div className='bed-img-wrapper'>
                        <img
                            src='https://res.cloudinary.com/dotasvsuv/image/upload/v1680449065/gtvwsbzg7nwel8tpwsqh.svg'
                            alt='single-bed'
                        />
                        <img
                            src='https://res.cloudinary.com/dotasvsuv/image/upload/v1680449065/gtvwsbzg7nwel8tpwsqh.svg'
                            alt='single-bed'
                        />
                    </div>
                    <h4>Bedroom 2</h4>
                    <p>2 single beds</p>
                </div>
            </div>
        </section>
    )
}
