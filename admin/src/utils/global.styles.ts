import { createStyles } from '@mantine/core';

export default createStyles(
    (theme) => ({
        dNoneMd: {
            [`@media (max-width: ${theme.breakpoints.md}px)`]: {
                display: 'none',
            },
        },
        dBlockMd: {
            [`@media (max-width: ${theme.breakpoints.md}px)`]: {
                display: 'block',
            },
        },
        rte: {
            '.ql-align-center': {
                img: {
                    margin: 'auto'
                }
            },
            '.ql-align-right': {
                img: {
                    marginLeft: 'auto',
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