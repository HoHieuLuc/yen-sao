import { createStyles } from '@mantine/core';

export default createStyles(
    () => ({
        fixedTable: {
            tableLayout: 'fixed',
        },
        item: {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '100%'
        }
    })
);