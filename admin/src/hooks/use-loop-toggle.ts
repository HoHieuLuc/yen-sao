import { useState } from 'react';

export const useLoopToggle = (values: Array<string>, defaultValueIndex: number) => {
    const [current, setCurrent] = useState(values[defaultValueIndex] || values[0]);

    const toggle = () => {
        const index = values.indexOf(current);
        const next = values[index + 1] || values[0];
        setCurrent(next);
    };

    return [current, toggle] as const;
};