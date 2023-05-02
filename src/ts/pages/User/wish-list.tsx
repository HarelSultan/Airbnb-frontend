import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootStateProps } from '../../store/store'
import { useLocation, useNavigate } from 'react-router-dom'
import { AppLogo } from '../../cmps/AppHeader/Logo/logo'
import { GrPrevious } from 'react-icons/gr'
import { FiShare } from 'react-icons/fi'
import { setUserWishListStays, updateWishList } from '../../store/user/user.action'
import { StayProps } from '../../interfaces/stay-interface'
import { StayList } from '../Home/cmps/stay-list'

export function WishList() {
    // const [wishListStays, setWishListStays] = useState<StayProps[] | null>(null)

    const loggedInUser = useSelector((storeState: RootStateProps) => storeState.userModule.loggedInUser)
    const isMobile = useSelector((storeState: RootStateProps) => storeState.appModule.isMobile)

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (!loggedInUser) navigate('/')
        // loggedInUser?.wishListStays ? setWishListStays(loggedInUser.wishListStays) : loadUserWishList()
        if (!loggedInUser?.wishListStays || loggedInUser.wishListStays.length < loggedInUser.wishListStaysId.length)
            loadUserWishList()
    }, [])

    const loadUserWishList = async () => {
        if (!loggedInUser) return
        try {
            await setUserWishListStays(loggedInUser)
            // setWishListStays(userWishListStays)
        } catch (err) {
            console.log(err)
            // TODO: showErrorMsg(err.msg)
        }
    }

    const onStayDetails = (stay: StayProps) => {
        const searchParams = new URLSearchParams(location.search)
        searchParams.set('checkIn', stay.randomAvaliableDates.checkIn.toString().slice(0, 10))
        searchParams.set('checkOut', stay.randomAvaliableDates.checkOut.toString().slice(0, 10))
        if (!searchParams.get('adults')) searchParams.set('adults', '1')
        navigate(`/stay/${stay._id}?${searchParams}`)
    }

    const onToggleSaveStay = async (ev: React.MouseEvent<HTMLButtonElement>, stay: StayProps) => {
        ev.stopPropagation()
        try {
            loggedInUser && updateWishList(loggedInUser, stay._id)
            // TODO: ShowSucessMsg(`${stay.name saved to wish list.}`)
        } catch (err: any) {
            // TODO: ShowErrorMsg(err.msg)
            console.log(err.msg)
        }
    }

    const onGoBack = () => {
        navigate(-1)
    }

    if (!loggedInUser?.wishListStays) return <div>No stays to display</div>

    return (
        <section className='main-layout wish-list'>
            {isMobile ? (
                <div className='full wish-list-mobile-header'>
                    <button onClick={onGoBack} className='btn btn-go-back'>
                        <GrPrevious />
                    </button>
                    <button className='btn btn-share underline'>
                        <FiShare />
                    </button>
                </div>
            ) : (
                <header className='full wish-list-header'>
                    <AppLogo />
                </header>
            )}
            <h1>Wishlist</h1>
            <StayList
                onStayDetails={onStayDetails}
                onToggleSaveStay={onToggleSaveStay}
                stays={loggedInUser.wishListStays}
                wishList={loggedInUser.wishListStaysId}
            />
        </section>
    )
}
