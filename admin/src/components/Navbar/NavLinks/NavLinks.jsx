import React from 'react';
import { useLocation } from 'react-router-dom';
import appConfig from '../../../config';
import NavLink from './NavLink';
import { SimpleGrid } from '@mantine/core';

const NavLinks = () => {
    const location = useLocation();
    return (
        <SimpleGrid cols={1} spacing={4}>
            {appConfig.navLinks.map(link => (
                <NavLink
                    key={link.title}
                    to={link.to}
                    title={link.title}
                    active={location.pathname.includes(link.to)}
                    subLinks={link.subLinks}
                    size='md'
                />
            ))}
        </SimpleGrid>
    );
};

export default NavLinks;