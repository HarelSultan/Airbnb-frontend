import { ReserveByProps } from '../interfaces/reserve-by-interface'
import { StayProps } from '../interfaces/stay-interface'
import { ReservationProps, UserProps } from '../interfaces/user-interface'
import { storageService } from './async-storage.service'
import { httpService } from './http.service'

const STORAGE_KEY_RESERVATION_DB: string = 'reservation_DB'
const BASE_URL: string = 'reservation/'

export const reservationService = {
    query,
    getHostReservations,
    getById,
    update,
    addReservation,
    addDemoReservation,
}

async function query(reservationsId: string[]) {
    return httpService.get(BASE_URL, { reservationsId })
}

async function getHostReservations(hostId: string) {
    return httpService.get(BASE_URL + 'host', { hostId })
}

async function getById(reservationId: string) {
    return storageService.get(STORAGE_KEY_RESERVATION_DB, reservationId) as Promise<ReservationProps>
}

function update(reservation: ReservationProps) {
    return httpService.put(BASE_URL + reservation._id, reservation)
}
function addDemoReservation(reservation: ReservationProps) {
    return storageService.post(STORAGE_KEY_RESERVATION_DB, reservation)
}

async function addReservation(
    reserveBy: ReserveByProps,
    nightsCount: number,
    guest: UserProps,
    stay: StayProps
): Promise<UserProps> {
    try {
        const reservation = {
            stayId: stay._id,
            stayName: stay.name,
            stayLocation: {
                city: stay.loc.city,
                lat: stay.loc.lat,
                lng: stay.loc.lng,
            },
            stayImgsUrl: stay.imgUrls,
            host: stay.host,
            guestId: guest._id,
            guestName: guest.fullname,
            reservationDates: {
                checkIn: reserveBy.checkIn,
                checkOut: reserveBy.checkOut,
            },
            bookedAt: new Date(),
            totalPayout: nightsCount * stay.price,
            guests: reserveBy.guests,
            status: 'pending',
        }
        return await httpService.post(BASE_URL, reservation)
    } catch (err) {
        console.log('Failed to add reservation with error:', err)
        throw err
    }
}
