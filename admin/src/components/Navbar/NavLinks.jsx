import React from 'react';
import { useLocation } from 'react-router-dom';
import appConfig from '../../config';
import NavLink from './NavLink';

const NavLinks = () => {
    const location = useLocation();
    return appConfig.navLinks.map(link => (
        <NavLink
            key={link.to}
            to={link.to}
            title={link.title}
            active={link.to.includes(location.pathname)}
            size='md'
        />
    ));
};

export default NavLinks;