import { ReactElement } from 'react'
import { DarkOverlay } from './AppHeader/cmps/dark-overlay'
import { AiOutlineClose } from 'react-icons/ai'

export interface ModalProps {
    className: string
    onCloseModal: () => void
    headerTxt: string | null
    children: ReactElement
}

export function Modal({ className, onCloseModal, headerTxt, children }: ModalProps) {
    return (
        <div className={`modal-wrapper ${className}`}>
            <DarkOverlay isOpen={true} setIsOpen={onCloseModal} />
            <div className='modal'>
                <div className='modal-header'>
                    <button onClick={onCloseModal} className='btn btn-close'>
                        <AiOutlineClose />
                    </button>
                    {headerTxt && <h2>{headerTxt}</h2>}
                </div>
                <div className='children-wrapper'>{children}</div>
            </div>
        </div>
    )
}
