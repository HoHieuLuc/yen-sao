import { useDebouncedValue } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useDebouncedSearchParams = (wait = 200) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = useState(searchParams.get('search') || '');
    const [debouncedSearch] = useDebouncedValue(search.trim(), wait);

    useEffect(() => {
        if (search === '') {
            searchParams.delete('search');
            searchParams.delete('page');
            setSearchParams(searchParams);
        }
    }, [search]);

    useEffect(() => {
        if (debouncedSearch !== '' ) {
            setSearchParams({ search: debouncedSearch });
        }
    }, [debouncedSearch]);

    return {
        search,
        debouncedSearch,
        setSearch,
    };
};