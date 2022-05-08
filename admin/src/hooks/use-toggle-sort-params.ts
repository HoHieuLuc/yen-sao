import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLoopToggle } from './use-loop-toggle';

// unused
export const useToggleSortParams = (sortValues: Array<string>) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentSort, toggleSort] = useLoopToggle(
        sortValues,
        sortValues.indexOf(
            searchParams.get('sort') || sortValues[0]
        )
    );

    useEffect(() => {
        if (currentSort === '') {
            searchParams.delete('sort');
        } else {
            searchParams.set('sort', currentSort);
        }
        setSearchParams(searchParams);
    }, [currentSort]);

    return [currentSort === '' ? null : currentSort, toggleSort] as const;
};