import { useState, useEffect, useMemo } from 'react'

export function useInfiniteScroll<T>(items: T[], itemsPerPage = 10) {
    const [currentPage, setCurrentPage] = useState<number>(1)

    useEffect(() => {
        setCurrentPage(1)
    }, [items])

    useEffect(() => {
        const handleScroll = () => {
            if (
                document.body.scrollHeight - 300 <
                window.scrollY + window.innerHeight
            ) {
                setCurrentPage((prevPage) => prevPage + 1)
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return useMemo(() => {
        return items.filter((_, index) => index < currentPage * itemsPerPage)
    }, [items, currentPage])
}
