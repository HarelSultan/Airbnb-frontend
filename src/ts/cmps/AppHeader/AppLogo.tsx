import { useNavigate } from 'react-router-dom'
import logo from '../../../assets/img/logo.svg'

export function AppLogo() {
    const navigate = useNavigate()

    const onNavigateHome = () => {
        navigate('/')
    }

    return <img src={logo} alt='App Logo' className='app-logo' onClick={onNavigateHome} />
}
