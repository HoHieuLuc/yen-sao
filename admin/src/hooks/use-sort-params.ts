import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

interface Current {
    currentSortValue: string | null;
    sortBy: string | null;
}

export const useSortParams = (values: Record<string, Array<string | null>>) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const isValidSortValue = Object.entries(values).flatMap(item => item[1])
        .indexOf(searchParams.get('sort')) !== -1;

    const [sort, setSort] = useState<Current>({
        currentSortValue: isValidSortValue
            ? searchParams.get('sort')
            : null,
        sortBy: null
    });

    useEffect(() => {
        if (!isValidSortValue) {
            searchParams.delete('sort');
            setSearchParams(searchParams);
        }
    }, []);

    useEffect(() => {
        const arrayOfSorts = Object.entries(values).flatMap(item => {
            return item[1];
        });
        if (
            arrayOfSorts.indexOf(sort.currentSortValue) === -1 ||
            !sort.currentSortValue
        ) {
            searchParams.delete('sort');
        } else {
            searchParams.set('sort', sort.currentSortValue);
        }
        setSearchParams(searchParams);
    }, [sort]);


    const toggle = (sortBy: string) => {
        setSort((prevSort) => {
            if (prevSort.sortBy !== sortBy) {
                if (sortBy ===
                    Object.entries(values).find(
                        item => item[1].find(
                            value => value === prevSort.currentSortValue
                        )
                    )?.at(0)
                ) {
                    const index = values[sortBy].indexOf(sort.currentSortValue);
                    const next = values[sortBy].at(index + 1);

                    return {
                        currentSortValue: next || null,
                        sortBy: sortBy,
                    };
                }

                return {
                    currentSortValue: values[sortBy].at(1) || null,
                    sortBy: sortBy,
                };
            } else {
                const index = values[sortBy].indexOf(sort.currentSortValue);
                const next = values[sortBy].at(index + 1);

                return {
                    currentSortValue: next || null,
                    sortBy: sortBy,
                };
            }
        });
    };

    return [sort, toggle] as const;
};