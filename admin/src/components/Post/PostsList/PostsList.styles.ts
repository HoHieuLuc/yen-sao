import { createStyles } from '@mantine/core';

export default createStyles(
    () => ({
        tableRow: {
            width: '15em'
        },
        item: {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '15em'
        },
    })
);