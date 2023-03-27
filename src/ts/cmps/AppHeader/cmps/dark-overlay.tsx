interface Props {
    isOpen: boolean
    setIsOpen: () => void
}

export function DarkOverlay({ isOpen, setIsOpen }: Props) {
    return <div className={`dark-overlay ${isOpen ? 'open' : ''}`} onClick={setIsOpen}></div>
}
