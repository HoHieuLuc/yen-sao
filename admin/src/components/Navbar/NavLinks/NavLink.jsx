import { Button } from '@mantine/core';
import { Link, useLocation, useResolvedPath, useMatch } from 'react-router-dom';
import LinksGroup from '../LinksGroup/LinksGroup';

const NavLink = ({ title, to, size, color, subLinks, subLinksPattern }) => {
    const location = useLocation();
    const style = {
        display: 'flex', alignItems: 'start'
    };
    if (subLinks) {
        const opened = location.pathname.includes(subLinksPattern);
        return (
            <LinksGroup
                title={title}
                initiallyOpened={opened}
                links={subLinks}
            />
        );
    }
    const resolved = useResolvedPath(to);
    const match = useMatch({ path: resolved.pathname, end: true });
    return (
        <Button
            fullWidth
            variant={match ? 'filled' : 'subtle'}
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