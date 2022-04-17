import { Button } from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';
import { LinksGroup } from '../LinksGroup/LinksGroup';

const NavLink = ({ title, to, size, active, color, subLinks }) => {
    const location = useLocation();
    const style = {
        display: 'flex', alignItems: 'start'
    };
    if (subLinks) {
        const opened = subLinks.map(o => o.to).includes(location.pathname);
        return (
            <LinksGroup
                title={title}
                initiallyOpened={opened}
                links={subLinks}
            />
        );
    }
    return (
        <Button
            fullWidth
            variant={active ? 'filled' : 'subtle'}
            component={Link}
            to={to}
            size={size}
            style={style}
            color={color}
        >
            {title}
        </Button>
    );
};

export default NavLink;