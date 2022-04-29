import { Button, MantineSize } from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';
import LinksGroup from '../LinksGroup/LinksGroup';
import { AppLink } from '../../../../config/types';

interface Props {
    title: string;
    to?: string;
    size: MantineSize;
    color?: string;
    subLinks?: AppLink[];
    subLinksPattern?: string;
}

const NavLink = ({ title, to, size, color, subLinks, subLinksPattern }: Props) => {
    const location = useLocation();
    const style = {
        display: 'flex', alignItems: 'start'
    };
    if (subLinks) {
        const opened = subLinksPattern ? location.pathname.includes(subLinksPattern) : false;
        return (
            <LinksGroup
                title={title}
                initiallyOpened={opened}
                links={subLinks}
            />
        );
    }
    // const resolved = useResolvedPath(to || '');
    // const match = useMatch({ path: resolved.pathname, end: true });
    return (
        <Button
            fullWidth
            //variant={match ? 'filled' : 'subtle'}
            variant='subtle'
            component={Link}
            to={to || ''}
            size={size}
            style={style}
            color={color}
        >
            {title}
        </Button>
    );
};

export default NavLink;