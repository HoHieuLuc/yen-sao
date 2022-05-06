import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { parseNumber } from '../utils/common';

export const usePagination = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = parseNumber(searchParams.get('page'), 1);
    const limit = parseNumber(searchParams.get('limit'), 10);

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

    const handleLimitChange = (limit: string) => {
        searchParams.delete('page');
        searchParams.set('limit', limit);
        setSearchParams(searchParams);
    };

    return {
        currentPage,
        handlePageChange,
        limit,
        handleLimitChange
    };
};