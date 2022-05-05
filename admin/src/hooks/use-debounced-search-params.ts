import { useDebouncedValue } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useDebouncedSearchParams = (wait = 200) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = useState(searchParams.get('search') || '');
    const [debouncedSearch] = useDebouncedValue(search.trim(), wait);

    useEffect(() => {        
        searchParams.delete('page');
        if (debouncedSearch !== '' ) {
            searchParams.set('search', debouncedSearch);
        } else {
            searchParams.delete('search');
        }
        setSearchParams(searchParams);
    }, [debouncedSearch]);

    return {
        search,
        debouncedSearch,
        setSearch,
    };
};