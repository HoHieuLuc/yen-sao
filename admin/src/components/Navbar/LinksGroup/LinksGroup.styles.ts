import { createStyles } from '@mantine/core';

export default createStyles(
    (theme) => ({
        control: {
            display: 'block',
            width: '100%',
            color: theme.colorScheme === 'dark' ? theme.colors.indigo[7] : theme.black,
            fontSize: theme.fontSizes.md,
            '&:hover': {
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
                color: theme.colorScheme === 'dark' ? theme.white : theme.black,
                borderRadius: theme.radius.sm,
            },
            button: {
                '&:hover': {
                    backgroundColor: 'transparent'
                }
            },
            cursor: 'pointer',
        },

        links: {
            borderLeft: `1px solid ${theme.colorScheme === 'dark' ?
                theme.colors.dark[4] :
                theme.colors.gray[3]}`,
            paddingLeft: '0.5rem',
        },

        chevron: {
            transition: 'transform 200ms ease',
        },
    })
);