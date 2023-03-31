import { StayProps } from '../../../../interfaces/stay-interface'

interface Props {
    stay: StayProps
}

export function StayAttributes({ stay }: Props) {
    return <section className='stay-attributes'></section>
}
