interface Props {
    onRemoveFilters: () => void
}

export function NoStays({ onRemoveFilters }: Props) {
    return (
        <section className='no-stays'>
            <h2>No exact matches</h2>
            <p>Try changing or removing some of your filters or adjusting your search area.</p>
            <button onClick={onRemoveFilters} className='btn btn-remove'>
                Remove all filters
            </button>
        </section>
    )
}
