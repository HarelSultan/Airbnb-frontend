import { useEffect, RefObject } from 'react'

export const useOnClickOutside = (elementRef: RefObject<HTMLElement>, onClickOutside: () => void) => {
    useEffect(() => {
        const el = elementRef.current

        function handleClick(ev: MouseEvent) {
            if (!el || el.contains(ev.target as Node)) return

            const toggleButton = document.querySelector('.user-menu')
            if (toggleButton && toggleButton.contains(ev.target as Node)) return

            ev.stopPropagation()
            onClickOutside()
        }
        document.addEventListener('mousedown', handleClick)

        return () => {
            document.removeEventListener('mousedown', handleClick)
        }
    }, [elementRef.current, onClickOutside])
}
