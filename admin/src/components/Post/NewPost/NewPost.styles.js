import { createStyles } from '@mantine/core';

export default createStyles(
    () => ({
        rte: {
            ['.ql-align-center']: {
                img: {
                    margin: 'auto'
                }
            },
            ['.ql-align-right']: {
                img: {
                    marginLeft: 'auto'
                }
            },
            p: {
                margin: '0'
            },
            img: {
                margin: '0'
            }
        }
    })
);