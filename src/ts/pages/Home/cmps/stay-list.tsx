import { useEffect, useRef } from 'react'

import { StayProps } from '../../../interfaces/stay-interface'
import { StayPreview } from './stay-preview'
import { useSelector } from 'react-redux'
import { RootStateProps } from '../../../store/store'

interface Props {
    stays: StayProps[]
    onStayDetails: (stay: StayProps) => void
    onToggleSaveStay: (ev: React.MouseEvent<HTMLButtonElement>, stay: StayProps) => void
    wishList: string[]
    onLoadStays?: (currStayPagination: number) => void
    isLoading?: boolean
}

export function StayList({ stays, onStayDetails, onToggleSaveStay, wishList, onLoadStays, isLoading }: Props) {
    const lastSkeletonRef = useRef<HTMLDivElement>(null)
    const currStayPagination = useRef(1)

    const totalPageCount = useSelector((storeState: RootStateProps) => storeState.stayModule.totalPageCount)

    useEffect(() => {
        if (!onLoadStays) return
        if (!totalPageCount) return
        const observer = new IntersectionObserver(
            entries => {
                if (totalPageCount <= currStayPagination.current) return
                const lastStay = entries[0]
                if (lastStay.isIntersecting) {
                    onLoadStays(currStayPagination.current)
                    currStayPagination.current++
                }
            },
            { threshold: 0 }
        )
        if (lastSkeletonRef.current) {
            observer.observe(lastSkeletonRef.current)
        }
        return () => {
            if (lastSkeletonRef.current) {
                observer.unobserve(lastSkeletonRef.current)
            }
        }
    }, [totalPageCount])

    const getSkeletonStays = () => {
        return Array.from({ length: 21 }, (_, idx) => <StayPreviewSkeleton key={`skeleton-${idx}`} />)
    }

    return (
        <section className='stay-list'>
            {stays.length
                ? stays.map((stay, idx) => (
                      <StayPreview
                          stay={stay}
                          onStayDetails={onStayDetails}
                          key={`${stay._id} + ${idx}`}
                          onToggleSaveStay={onToggleSaveStay}
                          wishList={wishList}
                      />
                  ))
                : getSkeletonStays()}
            <div className='last-skeleton' ref={lastSkeletonRef}></div>
            {isLoading && stays.length && getSkeletonStays()}
            <StayPreviewSkeleton />
        </section>
    )
}

export function StayPreviewSkeleton() {
    return (
        <div className='skeleton-preview'>
            <div className='skeleton-img'></div>
            <section className='skeleton-details'>
                <div className='group'>
                    <div className='skeleton text-skeleton'></div>
                    <div className='grow'>
                        <div className='skeleton icon-skeleton'></div>
                        <div className='skeleton text-skeleton'></div>
                    </div>
                </div>
                <div className='skeleton text-skeleton'></div>
                <div className='skeleton text-skeleton dates'></div>
                <div className='skeleton text-skeleton price'></div>
            </section>
        </div>
    )
}
