import { Routes, Route } from 'react-router-dom'
import { HomePage } from './ts/pages/Home/home-page'
import './assets/style/main.scss'
import { StayPage } from './ts/pages/Stay/stay-page'

function App() {
    return (
        <div className='App'>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/stay/:stayId' element={<StayPage />} />
            </Routes>
        </div>
    )
}

export default App
