interface Props {
    checkIn: Date
    checkOut: Date
    price: number
}

export function PriceBreakdown({ checkIn, checkOut, price }: Props) {
    const getReservationDates = () => {
        const dates = []
        let currDate = new Date(checkIn)
        while (currDate < checkOut) {
            dates.push(currDate.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' }))
            currDate.setDate(currDate.getDate() + 1)
        }
        return dates
    }
    const reservationDates = getReservationDates()

    return (
        <section className='price-breakdown'>
            <div className='wrapper'>
                {reservationDates.map(date => (
                    <div key={date}>
                        <p>{date}</p>
                        <p>${price}</p>
                    </div>
                ))}
            </div>
            <div className='total-price'>
                <p>Total Base Price</p>
                <p>${price * reservationDates.length}</p>
            </div>
        </section>
    )
}
