interface Props {
    onClickCB: (ev: React.MouseEvent<HTMLButtonElement>) => void
    txt: string
}

export function CtaBtn({ onClickCB, txt }: Props) {
    const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
        const { offsetX, offsetY } = event.nativeEvent
        const { offsetWidth, offsetHeight } = event.currentTarget
        event.currentTarget.style.setProperty('--mouseX', ((offsetX / offsetWidth) * 100).toString())
        event.currentTarget.style.setProperty('--mouseY', ((offsetY / offsetHeight) * 100).toString())
    }

    return (
        <button onMouseMove={handleMouseMove} onClick={onClickCB} className='btn btn-cta'>
            {txt}
        </button>
    )
}
