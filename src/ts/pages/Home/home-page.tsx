import { AppHeader } from '../../cmps/AppHeader/app-header'
import { Filter } from './cmps/filter'

export function HomePage() {
    return (
        <section className='main-layout home-page'>
            <AppHeader />
            <Filter />
        </section>
    )
}
