import { StayProps } from './stay-interface'

export interface UserProps {
    _id: string
    username: string
    password: string
    fullName: string
    stayWishList: string[]
    listingsId: string[]
    imgUrl: string
    listings?: StayProps[]
}

export interface UserLoginProps {
    username: string
    password: string
}

// WishList
