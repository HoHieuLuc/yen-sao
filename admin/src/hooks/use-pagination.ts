import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export const usePagination = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get('page') || '1');

    useEffect(() => {
        if (currentPage !== 1) {
            searchParams.set('page', currentPage.toString());
            setSearchParams(searchParams);
        }
    }, []);

    const handlePageChange = (page: number) => {
        searchParams.set('page', page.toString());
        setSearchParams(searchParams);
    };

    return {
        currentPage,
        handlePageChange,
    };
};