import { useState } from 'react'

import { StayDetailsProps, StayProps } from '../../interfaces/stay-interface'
import { stayService } from '../../services/stay.service'
import { uploadService } from '../../services/upload.service'
import { AppLogo } from '../../cmps/AppHeader/Logo/logo'
import { Counter } from '../../cmps/counter'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { GuestCounter } from '../../cmps/guest-counter'

export function EditStay() {
    const [stayToEdit, setStayToEdit] = useState<StayProps>(stayService.getEmptyStayProps())

    const labels = stayService.getLabelFilters().map(label => label.desc)
    const amenities = stayService.getAmenities()

    const handleChange = (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name: field, type } = ev.target
        let value: string | number = ev.target.value
        value = type === 'number' ? +value : value
        switch (field) {
            case 'country':
            case 'city':
            case 'address':
                return setStayToEdit(prevStay => {
                    const updatedLoc = { ...prevStay.loc, [field]: value }
                    return { ...prevStay, loc: updatedLoc }
                })
            default: {
                console.log('went to deafult with field:', field)
                return setStayToEdit(prevStay => ({ ...prevStay, [field]: value }))
            }
        }
    }

    const handleCounterChange = (changeBy: number, type: keyof StayDetailsProps) => {
        setStayToEdit(prevStay => {
            const updatedCount = prevStay.stayDetails[type] + changeBy
            const updatedDetails = { ...prevStay.stayDetails, [type]: updatedCount }
            return { ...prevStay, stayDetails: updatedDetails }
        })
    }

    const onUploadImage = async (ev: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const image = await uploadService.uploadImg(ev)
            setStayToEdit(prevStay => {
                const updatedImgUrls = [...prevStay.imgUrls, image.url]
                return { ...prevStay, imgUrls: updatedImgUrls }
            })
        } catch (err) {
            console.log(err)
        }
    }

    const onEditStay: React.FormEventHandler<HTMLFormElement> = ev => {
        ev.preventDefault()
    }

    interface CapacityType {
        type: keyof StayDetailsProps
        count: number
    }

    const capacityTypes: CapacityType[] = [
        {
            type: 'guests',
            count: stayToEdit.stayDetails.guests,
        },
        {
            type: 'bedrooms',
            count: stayToEdit.stayDetails.bedrooms,
        },
        {
            type: 'beds',
            count: stayToEdit.stayDetails.beds,
        },
        {
            type: 'bathrooms',
            count: stayToEdit.stayDetails.bathrooms,
        },
    ]

    return (
        <section className='main-layout full edit-stay'>
            <header className='full host-header'>
                <AppLogo />
            </header>
            <form onSubmit={onEditStay}>
                <h4 className='name-header'>Property name</h4>
                <label className={`stay-name ${stayToEdit.name ? 'filled' : ''}`}>
                    <div className='place-holder'>Name</div>
                    <input
                        type='text'
                        name='name'
                        value={stayToEdit.name}
                        onChange={handleChange}
                        placeholder='Name'
                        required
                    />
                </label>
                <h4 className='location-header'>Location</h4>
                <div className='location-wrapper'>
                    <label className={`city ${stayToEdit.loc.city ? 'filled' : ''}`}>
                        <div className='place-holder'>City</div>
                        <input
                            type='text'
                            name='city'
                            value={stayToEdit.loc.city}
                            onChange={handleChange}
                            placeholder='City'
                            required
                        />
                    </label>
                    <label className={`country ${stayToEdit.loc.country ? 'filled' : ''}`}>
                        <div className='place-holder'>Country</div>
                        <input
                            type='text'
                            name='country'
                            value={stayToEdit.loc.country}
                            onChange={handleChange}
                            placeholder='Country'
                            required
                        />
                    </label>
                    <label className={`address ${stayToEdit.loc.address ? 'filled' : ''}`}>
                        <div className='place-holder'>Address</div>
                        <input
                            type='text'
                            name='address'
                            value={stayToEdit.loc.address}
                            onChange={handleChange}
                            placeholder='Address'
                            required
                        />
                    </label>
                </div>
                <div className='imgs-wrapper'>
                    <label>
                        Upload image
                        <input type='file' hidden onChange={onUploadImage} />
                    </label>
                    <label>
                        Upload image
                        <input type='file' hidden onChange={onUploadImage} />
                    </label>
                    <label>
                        Upload image
                        <input type='file' hidden onChange={onUploadImage} />
                    </label>
                    <label>
                        Upload image
                        <input type='file' hidden onChange={onUploadImage} />
                    </label>
                    <label>
                        Upload image
                        <input type='file' hidden onChange={onUploadImage} />
                    </label>
                </div>

                <div className='wrapper'>
                    <div className='capacity-wrapper'>
                        <h4 className='capacity-header'>Capacity</h4>
                        {capacityTypes.map(capacityType => (
                            <div key={capacityType.type} className='capacity-type'>
                                <h5>{capacityType.type}</h5>
                                <Counter
                                    type={capacityType.type}
                                    handleStayCounterChange={handleCounterChange}
                                    count={capacityType.count}
                                />
                            </div>
                        ))}
                    </div>
                    <div className='stay-info-wrapper'>
                        <select onChange={handleChange} name='labels'>
                            Labels
                            {labels.map(label => (
                                <option key={label}>{label}</option>
                            ))}
                        </select>

                        <select onChange={handleChange} name='roomType'>
                            Property type
                            <option value='Private room'>Private room</option>
                            <option value='Entire home/apt'>Entire home/apt</option>
                        </select>

                        <select onChange={handleChange} name='amenities'>
                            Amenities
                            {amenities.map(amenity => (
                                <option key={amenity}>{amenity}</option>
                            ))}
                        </select>
                        <label className={`price ${stayToEdit.price ? 'filled' : ''}`}>
                            <div className='place-holder'>Price</div>

                            <input
                                type='number'
                                name='price'
                                value={stayToEdit.price}
                                onChange={handleChange}
                                min={10}
                            />
                        </label>
                    </div>
                </div>

                <h4 className='summary-header'>Description</h4>
                <textarea name='summary' value={stayToEdit.summary} onChange={handleChange} minLength={20}></textarea>

                <button className='btn btn-save'>Save</button>
            </form>
        </section>
    )
}
