interface Props {
    summary: string
}

export function StaySummary({ summary }: Props) {
    return (
        <section className='stay-summary'>
            <div className='summary-translation'>
                <img
                    src='https://res.cloudinary.com/dotasvsuv/image/upload/v1680446243/ux88njoy1tdljh09wdmj.svg'
                    alt=''
                />
                <p>Some info has been automatically translated.</p>
            </div>
            <p className='summary'>{summary}</p>
        </section>
    )
}
