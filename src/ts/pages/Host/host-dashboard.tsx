import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar, Pie } from 'react-chartjs-2'
import { ReservationProps, UserProps } from '../../interfaces/user-interface'

interface Props {
    host: UserProps
}

interface ReservationCountMap {
    [key: string]: number
}
export function HostDashboard({ host }: Props) {
    ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend)

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
        },
        maintainAspectRatio: false,
    }

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: labels.map(() => 1),
                backgroundColor: [
                    '#b30000',
                    '#7c1158',
                    '#4421af',
                    '#1a53ff',
                    '#0d88e6',
                    '#00b7c7',
                    '#5ad45a',
                    '#8be04e',
                    '#ebdc78',
                ],
            },
        ],
    }
    // if (!acc[reservation.stayId]) acc[reservation.stayId] = 0
    // acc[reservation.stayId]++
    // return acc
    const getListingsReservationsCount = (reservations: ReservationProps[]) => {
        const reservationsCountMap = reservations.reduce((acc: ReservationCountMap, reservation) => {
            if (!acc[reservation.stayId]) acc[reservation.stayId] = 0
            acc[reservation.stayId]++
            return acc
        }, {})
        return Object.values(reservationsCountMap)
    }

    const getReservationsStatusCount = (reservations: ReservationProps[]) => {
        const reservationsStatusMap = reservations.reduce((acc: ReservationCountMap, reservation) => {
            if (!acc[reservation.status]) acc[reservation.status] = 0
            acc[reservation.status]++
            return acc
        }, {})
        return reservationsStatusMap
    }

    const pieChartLabels = host.listings && host.listings.map(listing => listing.name)
    // host.listings.map(listing => (listing.name.length > 20 ? `${listing.name.slice(0, 15)}...` : listing.name))

    const pieChartData = {
        labels: pieChartLabels,
        datasets: [
            {
                labels: pieChartLabels,
                data: host.listingReservations && getListingsReservationsCount(host.listingReservations),
                backgroundColor: [
                    '#e60049',
                    '#0bb4ff',
                    '#50e991',
                    '#e6d800',
                    '#9b19f5',
                    '#ffa300',
                    '#dc0ab4',
                    '#b3d4ff',
                    '#00bfa0',
                ],

                borderWidth: 1,
            },
        ],
    }

    const pieChartOptions = {
        plugins: {
            legend: {
                position: 'left' as const,
                padding: 30,
                maxWidth: 180,
                labels: {
                    padding: 20,
                    font: {
                        size: 14,
                    },
                    usePointStyle: true,
                    pointStyle: 'rectRounded',
                },
            },
            title: {
                display: false,
            },
            tooltip: {
                bodySpacing: 20,
                callbacks: {
                    label: function (context: any) {
                        const label = context.label
                        const value = context.formattedValue
                        return `${label}: ${value} reservations`
                    },
                    title: () => '',
                },
            },
        },
    }
    // maintainAspectRatio: false,

    return (
        <section className='reservation-charts'>
            <div className='bar-chart-container'>
                <h2>Revenue / month</h2>
                <Bar width={'unset'} height={'unset'} className='chart line-chart' options={options} data={data} />
            </div>

            <div className='reservations-status-container'>
                <h2>Reservations status</h2>
                <div className='status-wrapper'>
                    <p>pending</p>
                    <span className='pending-count'>{/* {reservationsStatusCountMap.pending} */}2</span>
                </div>
                <div className='status-wrapper'>
                    <p>approved</p>
                    <span className='approved-count'>{/* {reservationsStatusCountMap.approved} */}4</span>
                </div>
                <div className='status-wrapper'>
                    <p>rejected</p>
                    <span className='rejected-count'>{/* {reservationsStatusCountMap.pending} */}1</span>
                </div>
            </div>

            <div className='pie-chart-container'>
                <h2>Reservations / listing</h2>
                <Pie
                    className='chart pie-chart'
                    width={'unset'}
                    height={'unset'}
                    data={pieChartData}
                    options={pieChartOptions}
                />
            </div>
        </section>
    )
}
