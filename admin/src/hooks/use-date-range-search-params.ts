import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useDateRangeSearchParams = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const fromParam = searchParams.get('from') || null;
    const toParam = searchParams.get('to') || null;

    const _from = (fromParam && !isNaN(Number(fromParam)))
        ? new Date(Number(fromParam))
        : null;
    const _to = (toParam && !isNaN(Number(toParam)))
        ? new Date(Number(toParam))
        : null;

    const [from, setFrom] = useState<Date | null>(_from);
    const [to, setTo] = useState<Date | null>(_to);

    useEffect(() => {
        if (!from) {
            searchParams.delete('from');
        }
        if (!to) {
            searchParams.delete('to');
        }
        setSearchParams(searchParams);
    }, []);

    const handleSearch = () => {
        searchParams.delete('from');
        searchParams.delete('to');
        searchParams.delete('page');
        if (from) {
            searchParams.set('from', from.getTime().toString());
        }
        if (to) {
            searchParams.set('to', to.getTime().toString());
        }
        setSearchParams(searchParams);
    };


    return {
        from: {
            value: from,
            onChange: setFrom,
            paramValue: fromParam ? Number(fromParam) : null
        },
        to: {
            value: to,
            onChange: setTo,
            paramValue: toParam ? Number(toParam) : null
        },
        handleSearch
    };
};

export type DateRangeSearchType = ReturnType<typeof useDateRangeSearchParams>;