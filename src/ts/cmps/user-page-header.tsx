import { useNavigate } from 'react-router-dom'
import { UserProps } from '../interfaces/user-interface'
import { AppLogo } from './AppHeader/Logo/logo'
import { UserMenu } from './user-menu'
import { logout } from '../store/user/user.action'

interface Props {
    loggedInUser: UserProps | null
}

export function UserPageHeader({ loggedInUser }: Props) {
    const navigate = useNavigate()

    const onBecomeHost = () => {
        navigate('/host/edit')
    }

    const onLogout = () => {
        navigate('/')
        logout()
    }

    return (
        <header className='full user-page-header'>
            <AppLogo />
            <UserMenu loggedInUser={loggedInUser} navigate={navigate} onBecomeHost={onBecomeHost} onLogout={onLogout} />
        </header>
    )
}
