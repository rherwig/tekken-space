import { useState, useEffect, useCallback } from 'react';

const ITEMS_PER_PAGE = 10;

export function useInfiniteScroll<T>(items: T[]) {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [visibleItems, setVisibleItems] = useState<T[]>([]);

    const loadMoreItems = useCallback(() => {
        const nextPageItems = items.slice(visibleItems.length, visibleItems.length + ITEMS_PER_PAGE);
        setVisibleItems((prevItems) => [...prevItems, ...nextPageItems]);
        setCurrentPage((prevPage) => prevPage + 1);
    }, [items, visibleItems.length]);

    useEffect(() => {
        setVisibleItems(items.slice(0, ITEMS_PER_PAGE));
        setCurrentPage(1);
    }, [items]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
                loadMoreItems();
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [loadMoreItems]);

    return visibleItems;
}