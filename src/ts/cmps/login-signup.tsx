import { useState } from 'react'
import { UserCredentials } from '../interfaces/user-interface'
import { userService } from '../services/user.service'
import { useFormRegister } from '../hooks/use-form'
import { CtaBtn } from './cta-btn'

interface Props {
    isSignningUp: boolean
}

export function LoginSignup({ isSignningUp }: Props) {
    const [isSignup, setIsSignup] = useState<boolean>(isSignningUp)
    const [credentials, setCredentials] = useState<UserCredentials>(userService.getUserDefaultCreds())

    const [register] = useFormRegister(credentials, setCredentials)

    const toggleIsSignup = () => {
        setIsSignup(prevState => !prevState)
    }

    const onLoginSignup = async () => {
        try {
            const user = isSignup ? userService.signup(credentials) : userService.login(credentials)
            // TODO: showSucessMsg(`Welcome back, ${user.fullName}`)
            // ? return user ? showSucessMsg(`Welcome back, ${user.fullName}`) : ''
        } catch (err) {
            // TODO: showErrorMsg(err.txt)
        }
    }

    return (
        <section className='login-signup'>
            <div>
                <p>{isSignup ? 'Already a member ?' : `Don't have an account ?`}</p>
                <button onClick={toggleIsSignup} className='btn btn-toggle underline'>
                    {isSignup ? 'Log in' : 'Sign up'}
                </button>
            </div>
            {isSignup && (
                <label className='full-name'>
                    <input placeholder='Full name' {...register('fullName')} required />
                </label>
            )}
            <label className='user-name'>
                <input placeholder='Username' {...register('username')} required />
            </label>
            <label className='password'>
                <input placeholder='Password' {...register('password')} required />
            </label>
            <button className='btn btn-login-signup'>{isSignup ? 'Sign up' : 'Login'}</button>
            <CtaBtn onClickCB={onLoginSignup} txt={isSignup ? 'Sign up' : 'Login'} />
        </section>
    )
}
