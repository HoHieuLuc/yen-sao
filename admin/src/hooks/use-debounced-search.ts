import { useDebouncedValue } from '@mantine/hooks';
import { useState } from 'react';

export const useDebouncedSearch = (value = '', wait = 200) => {
    const [search, setSearch] = useState(value);
    const [debouncedSeach] = useDebouncedValue(search.trim(), wait);

    return {
        search,
        debouncedSeach,
        setSearch,
    };
};