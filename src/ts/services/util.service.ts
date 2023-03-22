import { AvaliableDatesProps } from '../interfaces/stay-interface'

export const utilService = {
    makeId,
    saveToStorage,
    loadFromStorage,
    getRandomInt,
    getRandomAvaliableDates,
    formatDateRange,
}

function getRandomAvaliableDates() {
    const checkInDate = new Date()
    checkInDate.setDate(checkInDate.getDate() + getRandomInt(0, 120))
    const checkOutDate = new Date(checkInDate)
    const randNumOfNights = getRandomInt(1, 7)
    checkOutDate.setDate(checkInDate.getDate() + randNumOfNights)
    return {
        checkInDate,
        checkOutDate,
    }
}

function formatDateRange({ checkInDate, checkOutDate }: AvaliableDatesProps) {
    // Converting checkIn/Out dates to Date object
    checkInDate = new Date(checkInDate)
    checkOutDate = new Date(checkOutDate)
    const checkInMonth = checkInDate.toLocaleString('default', { month: 'short' })
    const checkOutMonth = checkOutDate.toLocaleString('default', { month: 'short' })
    let formattedDateRange = `${checkInMonth} ${checkInDate.getDate()} - ${checkOutDate.getDate()}`
    // Checking if Checkout date is in a different month
    if (checkInMonth !== checkOutMonth) formattedDateRange += ` ${checkOutMonth}`
    return formattedDateRange
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

function saveToStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key: string) {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : undefined
}

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
}
