import React, { useState } from 'react';
import { Group, Box, Collapse, ThemeIcon, Button } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import useStyles from './LinksGroup.styles';

export function LinksGroup({ title, initiallyOpened, links }) {
    const { classes } = useStyles();
    const location = useLocation();
    const [opened, setOpened] = useState(initiallyOpened || false);
    const hasLinks = Array.isArray(links);

    const items = (hasLinks ? links : []).map((link) => (
        <Button
            key={link.title}
            fullWidth
            component={Link}
            to={link.to}
            size='md'
            style={{ display: 'flex', alignItems: 'start' }}
            variant={location.pathname.includes(link.to) ? 'filled' : 'subtle'}
        >
            {link.title}
        </Button>
    ));

    return (
        <>
            <Box onClick={() => setOpened((o) => !o)} className={classes.control}>
                <Group position="apart" spacing={0}>
                    <Box
                        size='md'
                        sx={{ display: 'flex', alignItems: 'center' }}
                    >
                        <Button
                            fullWidth
                            size='md'
                            variant='subtle'
                        >
                            {title}
                        </Button>
                    </Box>
                    {hasLinks && (
                        <ThemeIcon variant='subtle'>
                            <FontAwesomeIcon
                                className={classes.chevron}
                                icon={faAngleRight}
                                style={{
                                    transform: opened ? `rotate(${90}deg)` : 'none',
                                }}
                            />
                        </ThemeIcon>
                    )}
                </Group>
            </Box>
            {hasLinks ? <Collapse in={opened} className={classes.links}>{items}</Collapse> : null}
        </>
    );
}