export interface UserProps {
    _id: string
    username: string
    password: string
    fullName: string
    stayWishList: string[]
    listingsId: string[]
    imgUrl: string
}

export interface UserLoginProps {
    username: string
    password: string
}

// WishList
