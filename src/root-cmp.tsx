import { Routes, Route } from 'react-router-dom'
import { HomePage } from './ts/pages/Home/home-page'
import './assets/style/main.scss'

function App() {
    return (
        <div className='App'>
            <Routes>
                <Route path='/' element={<HomePage />} />
            </Routes>
        </div>
    )
}

export default App
