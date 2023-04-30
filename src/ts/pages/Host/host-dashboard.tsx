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
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
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

    host.listingReservations && getListingsReservationsCount(host.listingReservations)

    const pieChartLabels = host.listings && host?.listings.map(listing => listing.name)
    const pieChartData = {
        labels: pieChartLabels,
        datasets: [
            {
                labels: pieChartLabels,
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }

    const pieChartOptions = {
        plugins: {
            legend: {
                position: 'left' as const,
                labels: {
                    font: {
                        size: 16,
                    },
                    usePointStyle: true,
                    pointStyle: 'rectRounded',
                },
            },
            title: {
                display: false,
            },
        },
        maintainAspectRatio: false,
    }

    return (
        <section className='reservation-charts'>
            <Bar width={'unset'} height={'unset'} className='chart line-chart' options={options} data={data} />
            <Pie
                className='chart pie-chart'
                width={'unset'}
                height={'unset'}
                data={pieChartData}
                options={pieChartOptions}
            />
        </section>
    )
}
