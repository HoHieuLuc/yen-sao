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
                    margin: 'auto',
                    [theme.fn.largerThan('sm')]: {
                        maxWidth: '50%',
                    }
                }
            },
            '.ql-align-right': {
                img: {
                    marginLeft: 'auto',
                }
            },
            '& p, & img, & h1, & h2, & h3, & h4, & h5, & h6': {
                margin: 0
            },
        }
    })
);