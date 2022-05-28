import useStyles from './LinksGroup.styles';
import { useState } from 'react';

import { Group, Box, Collapse, ThemeIcon, Button, SimpleGrid } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import NavLink from '../NavLinks/NavLink';

import { AppLink } from '../../../../config/types';

interface Props {
    title: string;
    initiallyOpened?: boolean;
    links: Array<AppLink>;
    icon?: React.ReactNode;
}

const LinksGroup = ({ title, initiallyOpened, links, icon }: Props) => {
    const { classes } = useStyles();
    const [opened, setOpened] = useState(initiallyOpened || false);

    const items = links.map((link) => {
        if (link.type === 'hidden') {
            return null;
        }
        return (
            <NavLink
                key={link.title}
                {...link}
                size='md'
            />
        );
    });

    return (
        <>
            <Box
                onClick={() => setOpened((o) => !o)}
                className={classes.control}
            >
                <Group position="apart" spacing={1}>
                    <Box
                        sx={(theme) => ({
                            display: 'flex',
                            alignItems: 'center',
                            blockSize: theme.fontSizes.md,
                            height: '100%',
                        })}
                    >
                        <Button
                            fullWidth
                            size='md'
                            variant='subtle'
                            leftIcon={icon && icon}
                        >
                            {title}
                        </Button>
                    </Box>
                    <ThemeIcon sx={(theme) => ({
                        backgroundColor: 'transparent',
                        color: theme.colorScheme === 'dark' ? 'white' : theme.primaryColor,
                    })}>
                        <FontAwesomeIcon
                            className={classes.chevron}
                            icon={faAngleRight}
                            style={{
                                transform: opened ? `rotate(${90}deg)` : 'none',
                            }}
                        />
                    </ThemeIcon>
                </Group>
            </Box>
            <Collapse in={opened} className={classes.links}>
                <SimpleGrid cols={1} spacing={4}>
                    {items}
                </SimpleGrid>
            </Collapse>
        </>
    );
};

export default LinksGroup;