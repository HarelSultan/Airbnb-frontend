import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootStateProps } from '../../store/store'
import { useLocation, useNavigate } from 'react-router-dom'
import { FiShare } from 'react-icons/fi'
import { setUserWishListStays, updateWishList } from '../../store/user/user.action'
import { StayProps } from '../../interfaces/stay-interface'
import { StayList } from '../Home/cmps/stay-list'
import { BiArrowBack } from 'react-icons/bi'
import { UserPageHeader } from '../../cmps/user-page-header'
import { MobileHeader } from '../../cmps/mobile-header'

export function WishList() {
    const loggedInUser = useSelector((storeState: RootStateProps) => storeState.userModule.loggedInUser)
    const isMobile = useSelector((storeState: RootStateProps) => storeState.appModule.isMobile)

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (!loggedInUser) return navigate('/')
        if (!loggedInUser.wishListStays || loggedInUser.wishListStays.length !== loggedInUser.wishListStaysId.length)
            loadUserWishList()
    }, [])

    const loadUserWishList = async () => {
        if (!loggedInUser || !loggedInUser.wishListStaysId.length) return
        try {
            await setUserWishListStays(loggedInUser)
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

    if (!loggedInUser?.wishListStays?.length) return <div>No stays to display</div>

    return (
        <section className='main-layout wish-list'>
            {isMobile ? <MobileHeader /> : <UserPageHeader loggedInUser={loggedInUser} />}
            <div className='full wish-list-header'>
                <div className='actions-wrapper'>
                    <button onClick={onGoBack} className='btn btn-go-back'>
                        <BiArrowBack className='go-back-icon' />
                    </button>
                    <button className='btn btn-share underline'>
                        <FiShare className='share-icon' />
                    </button>
                </div>
                <h1>Wishlist</h1>
            </div>
            <StayList
                onStayDetails={onStayDetails}
                onToggleSaveStay={onToggleSaveStay}
                stays={loggedInUser.wishListStays}
                wishList={loggedInUser.wishListStaysId}
            />
        </section>
    )
}
