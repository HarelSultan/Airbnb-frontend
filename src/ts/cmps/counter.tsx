import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { GuestProps } from '../interfaces/search-by-interface'
import { StayDetailsProps } from '../interfaces/stay-interface'

interface Props {
    type: keyof GuestProps | keyof StayDetailsProps
    handleGuestCounterChange?: (changeBy: number, type: keyof GuestProps) => void
    handleStayCounterChange?: (changeBy: number, type: keyof StayDetailsProps) => void
    // handleCounterChange: (changeBy: number, type: keyof GuestProps) => void
    count: number
}
// isDisabled
export function Counter({ type, handleGuestCounterChange, handleStayCounterChange, count }: Props) {
    const handleCounterChange = (changeBy: number) => {
        if (handleGuestCounterChange) return handleGuestCounterChange(changeBy, type as keyof GuestProps)
        if (handleStayCounterChange) return handleStayCounterChange(changeBy, type as keyof StayDetailsProps)
    }

    return (
        <div className='counter'>
            <button className='btn' type='button' disabled={count === 0} onClick={() => handleCounterChange(-1)}>
                <AiOutlineMinus />
            </button>
            <p>{count}</p>
            <button className='btn' type='button' onClick={() => handleCounterChange(1)}>
                <AiOutlinePlus />
            </button>
        </div>
    )
}
// import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
// import { GuestProps } from '../interfaces/search-by-interface'

// interface Props {
//     guestType: keyof GuestProps
//     handleCounterChange: (changeBy: number, guestType: keyof GuestProps) => void
//     count: number
// }
// // isDisabled
// export function Counter({ handleCounterChange, guestType, count }: Props) {
//     return (
//         <div className='counter'>
//             <button disabled={count === 0} onClick={() => handleCounterChange(-1, guestType)}>
//                 <AiOutlineMinus />
//             </button>
//             <p>{count}</p>
//             <button onClick={() => handleCounterChange(1, guestType)}>
//                 <AiOutlinePlus />
//             </button>
//         </div>
//     )
// }
