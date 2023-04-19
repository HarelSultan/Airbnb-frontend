import { useState } from 'react'
import { UserProps } from '../interfaces/user-interface'
import { userService } from '../services/user.service'
import { useFormRegister } from '../hooks/use-form'
import { CtaBtn } from './cta-btn'
import { demoUserLogin, login, signup } from '../store/user/user.action'

interface Props {
    isSignningUp: boolean
    onLoginSignupCB?: () => void
}

export function LoginSignup({ isSignningUp, onLoginSignupCB }: Props) {
    const [isSignup, setIsSignup] = useState<boolean>(isSignningUp)
    const [credentials, setCredentials] = useState<UserProps>(userService.getUserDefaultCreds())

    const [register] = useFormRegister(credentials, setCredentials)

    const toggleIsSignup = () => {
        setIsSignup(prevState => !prevState)
    }

    const onLoginSignup = async () => {
        try {
            const user = isSignup ? signup(credentials) : login(credentials)
            if (onLoginSignupCB) onLoginSignupCB()
            // TODO: showSucessMsg(`Welcome back, ${user.fullName}`)
            // ? return user ? showSucessMsg(`Welcome back, ${user.fullName}`) : ''
        } catch (err) {
            // TODO: showErrorMsg(err.txt)
        }
    }

    const onDemoUserLogin = async () => {
        try {
            const demoUser = demoUserLogin()
            if (onLoginSignupCB) onLoginSignupCB()
            // TODO: showSucessMsg(`Welcome, you are logged in with a demo user`)
        } catch (err) {
            // TODO: showErrorMsg(err.txt)
        }
    }

    return (
        <section className='login-signup'>
            <h2>{isSignup ? 'Sign up' : 'Log in'}</h2>
            <div className='login-signup-header'>
                <p>{isSignup ? 'Already a member ?' : `Don't have an account ?`}</p>
                <div className='btns-container'>
                    <button onClick={toggleIsSignup} className='btn btn-toggle underline'>
                        {isSignup ? 'Log in' : 'Sign up'}
                    </button>
                    |
                    <button onClick={onDemoUserLogin} className='btn btn-demo-user underline'>
                        <p>Continue with demo user</p>
                    </button>
                </div>
            </div>
            {isSignup && (
                <label className={`full-name ${credentials.fullName ? 'filled' : ''}`}>
                    <div className='place-holder'>Full name</div>

                    <input placeholder='Full name' {...register('fullName')} required />
                </label>
            )}
            <label className={`user-name ${credentials.username ? 'filled' : ''}`}>
                <div className='place-holder'>Username</div>
                <input placeholder='Username' {...register('username')} required />
            </label>
            <label className={`password ${credentials.password ? 'filled' : ''}`}>
                <div className='place-holder'>Password</div>

                <input placeholder='Password' {...register('password')} required />
            </label>
            <CtaBtn onClickCB={onLoginSignup} txt={isSignup ? 'Sign up' : 'Login'} />
        </section>
    )
}
