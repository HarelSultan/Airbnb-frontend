import { Routes, Route } from 'react-router-dom'
import { Home } from './ts/pages/Home/Home'
import './assets/style/main.scss'

function App() {
    return (
        <div className='App'>
            <Routes>
                <Route path='/' element={<Home />} />
            </Routes>
        </div>
    )
}

export default App
