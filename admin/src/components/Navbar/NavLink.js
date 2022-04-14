import React from 'react';
import { Button } from '@mantine/core';
import { Link } from 'react-router-dom';

const NavLink = ({ title, to, size, active, color }) => {
    return (
        <Button
            fullWidth
            variant={active ? 'light' : 'subtle'}
            component={Link}
            to={to}
            size={size}
            style={{ display: 'flex', alignItems: 'start' }}
            color={color}
        >
            {title}
        </Button>
    );
};

export default NavLink;