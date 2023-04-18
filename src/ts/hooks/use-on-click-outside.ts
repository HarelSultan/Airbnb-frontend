import { useEffect, RefObject } from 'react'

interface Props {
    elementRef: RefObject<HTMLElement>
    onClickOutside: () => void
}

export const useOnClickOutside = (elementRef: RefObject<HTMLElement>, onClickOutside: () => void) => {
    useEffect(() => {
        const el = elementRef.current

        const handleClick = (ev: MouseEvent) => {
            if (!el || el.contains(ev.target as Node)) return
            onClickOutside()
        }
        console.log('on')
        // function handleClick(ev: MouseEvent) {
        //     if (!el || el.contains(ev.target as Node)) return
        //     onClickOutside()
        // }
        document.addEventListener('mousedown', handleClick)

        return () => {
            document.removeEventListener('mousedown', handleClick)
        }
    }, [elementRef])
}
