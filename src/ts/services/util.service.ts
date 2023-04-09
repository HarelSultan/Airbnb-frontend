import { GuestProps, SearchByProps } from '../interfaces/search-by-interface'
import { DatesProps } from '../interfaces/stay-interface'

export const utilService = {
    makeId,
    saveToStorage,
    loadFromStorage,
    getRandomInt,
    getRandomDates,
    formatDateRange,
    formatGuestCount,
    formatDate,
    formatSearchParams,
    isDateRangeTaken,
    formatPlural,
    getFirstName,
    getNightsCount,
}

function getRandomDates(takenDates: DatesProps[]): DatesProps {
    const checkIn = new Date()
    checkIn.setDate(checkIn.getDate() + getRandomInt(0, 120))
    const checkOut = new Date(checkIn)
    const randNumOfNights = getRandomInt(1, 7)
    checkOut.setDate(checkIn.getDate() + randNumOfNights)
    if (isDateRangeTaken(takenDates, { checkIn, checkOut })) {
        console.log('takenDates:', takenDates, 'requestedDates:', { checkIn, checkOut })
        return getRandomDates(takenDates)
    }
    return {
        checkIn,
        checkOut,
    }
}

function isDateRangeTaken(takenDates: DatesProps[], requestedDates: DatesProps) {
    if (!takenDates.length) return false
    const requestedCheckIn = requestedDates.checkIn.getTime()
    const requestedCheckOut = requestedDates.checkOut.getTime()
    return takenDates.some(takenDate => {
        const takenCheckIn =
            typeof takenDate.checkIn === 'string' ? new Date(takenDate.checkIn).getTime() : takenDate.checkIn.getTime()
        const takenCheckOut =
            typeof takenDate.checkOut === 'string'
                ? new Date(takenDate.checkOut).getTime()
                : takenDate.checkOut.getTime()
        if (requestedCheckIn < takenCheckOut && requestedCheckOut > takenCheckIn) return true
        return false
    })
}

function formatDateRange({ checkIn, checkOut }: DatesProps) {
    // Converting checkIn/Out dates to Date object
    checkIn = new Date(checkIn)
    checkOut = new Date(checkOut)
    const checkInMonth = checkIn.toLocaleString('default', { month: 'short' })
    const checkOutMonth = checkOut.toLocaleString('default', { month: 'short' })
    let formattedDateRange = `${checkInMonth} ${checkIn.getDate()} - ${checkOut.getDate()}`
    // Checking if Checkout date is in a different month
    if (checkInMonth !== checkOutMonth) formattedDateRange += ` ${checkOutMonth}`
    return formattedDateRange
}

function formatDate(date: Date | null) {
    if (date === null) return ''
    return date.toLocaleString('default', { month: 'short', day: 'numeric' })
}

function getNightsCount(stayDates: DatesProps | null) {
    // Change here after using skeletons
    if (!stayDates) return null
    const { checkIn, checkOut } = stayDates
    const checkInTime = checkIn.getTime()
    const checkOutTime = checkOut.getTime()
    const diff = checkOutTime - checkInTime
    return Math.round(diff / (1000 * 60 * 60 * 24))
}

function formatGuestCount(guests: GuestProps) {
    // If there are no adults returning empty string -> fallback to placeholder
    if (guests.adults === 0) return ''
    // Checking the count of guests and formatting to either a singular or plural
    let formattedGuestCount = formatPlural(guests.adults + guests.children, ' guest')
    if (guests.infants) formattedGuestCount += `, ${formatPlural(guests.infants, ' infant')}`
    if (guests.pets) formattedGuestCount += `, ${formatPlural(guests.pets, ' pet')}`
    return formattedGuestCount
}

function formatPlural(count: number, key: string) {
    return count > 1 ? count + key + 's' : count + key
}

function getFirstName(fullName: string) {
    return fullName.split(' ')[0]
}

function formatSearchParams(searchBy: SearchByProps) {
    const searchParams: any = {}
    searchParams.destination = searchBy.destination
    if (searchBy.checkIn) searchParams.checkIn = searchBy.checkIn.toISOString().slice(0, 10)
    if (searchBy.checkOut) searchParams.checkOut = searchBy.checkOut.toISOString().slice(0, 10)
    if (searchBy.guests.adults) {
        Object.entries(searchBy.guests).map(([key, value]) => {
            searchParams[key] = value.toString()
        })
    }
    return searchParams
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
