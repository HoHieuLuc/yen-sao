import React, { useState } from 'react';
import { Group, Box, Collapse, ThemeIcon, Button, SimpleGrid } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import NavLink from '../NavLinks/NavLink';
import useStyles from './LinksGroup.styles';

const LinksGroup = ({ title, initiallyOpened, links }) => {
    const { classes } = useStyles();
    const [opened, setOpened] = useState(initiallyOpened || false);
    const hasLinks = Array.isArray(links);

    const items = (hasLinks ? links : []).map((link) => {
        if (link.isNotNavLink) {
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
            {hasLinks &&
                <Collapse in={opened} className={classes.links}>
                    <SimpleGrid cols={1} spacing={4}>
                        {items}
                    </SimpleGrid>
                </Collapse>
            }
        </>
    );
};

export default LinksGroup;