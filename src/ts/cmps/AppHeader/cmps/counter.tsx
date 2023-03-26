import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { searchByGuestProps } from '../../../interfaces/search-by-interface'

interface Props {
    guestType: keyof searchByGuestProps
    handleCounterChange: (changeBy: number, guestType: keyof searchByGuestProps) => void
    count: number
}
export function Counter({ handleCounterChange, guestType, count }: Props) {
    return (
        <div className='counter'>
            <button disabled={count === 0} onClick={() => handleCounterChange(-1, guestType)}>
                <AiOutlineMinus />
            </button>
            <p>{count}</p>
            <button onClick={() => handleCounterChange(1, guestType)}>
                <AiOutlinePlus />
            </button>
        </div>
    )
}
