import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar, Pie } from 'react-chartjs-2'
import { DashboardDataProps, ReservationCountMap } from '../../interfaces/user-interface'

interface Props {
    listingsName: string[]
    hostChartData: DashboardDataProps
}

export function HostCharts({ listingsName, hostChartData }: Props) {
    ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend)

    const { hostMonthlyRevenue, listingReservationsCountMap, reservationsStatusCountMap } = hostChartData

    const barChartOptions = {
        responsive: true,
        scales: {
            x: {
                ticks: {
                    autoSkip: false,
                    maxRotation: 0,
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
            tooltip: {
                padding: 10,
                boxPadding: 5,
                callbacks: {
                    label: (context: any) => `$${context.formattedValue}`,
                },
            },
        },
        maintainAspectRatio: false,
    }

    const barChartData = {
        labels: Object.keys(hostMonthlyRevenue),
        datasets: [
            {
                data: Object.values(hostMonthlyRevenue),
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

    const pieChartData = {
        labels: listingsName,

        datasets: [
            {
                labels: listingsName,
                data: Object.values(listingReservationsCountMap),
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
                labels: {
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

    return (
        <section className='reservation-charts'>
            <div className='bar-chart-container'>
                <h2>Revenue / month</h2>
                <Bar
                    width={'unset'}
                    height={'unset'}
                    className='chart line-chart'
                    options={barChartOptions}
                    data={barChartData}
                />
            </div>

            <div className='reservations-status-container'>
                <h2>Reservations status</h2>
                <div className='status-wrapper'>
                    <p>pending</p>
                    <span className='pending-count'>{reservationsStatusCountMap.pending}</span>
                </div>
                <div className='status-wrapper'>
                    <p>approved</p>
                    <span className='approved-count'>{reservationsStatusCountMap.approved}</span>
                </div>
                <div className='status-wrapper'>
                    <p>rejected</p>
                    <span className='rejected-count'>{reservationsStatusCountMap.rejected}</span>
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
