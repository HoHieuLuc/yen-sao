import { Link, useLocation } from 'react-router-dom';
import { Button, MantineSize } from '@mantine/core';
import LinksGroup from '../LinksGroup/LinksGroup';

import { AppLink } from '../../../../config/types';
import { authHooks } from '../../../../graphql/queries';

interface Props {
    title: string;
    to?: string;
    size: MantineSize;
    color?: string;
    subLinks?: AppLink[];
    subLinksPattern?: string;
    roles?: Array<string>;
    icon?: React.ReactNode;
}

const NavLink = ({ title, to, size, color, subLinks, subLinksPattern, roles, icon }: Props) => {
    const me = authHooks.useReadCurrentUser();
    const location = useLocation();
    const style = {
        display: 'flex', alignItems: 'start'
    };
    if (subLinks) {
        const opened = subLinksPattern
            ? location.pathname.includes(subLinksPattern)
            : false;
        return (
            <LinksGroup
                title={title}
                initiallyOpened={opened}
                links={subLinks}
                icon={icon}
            />
        );
    }
    if (roles && !roles.includes(me.role)) {
        return null;
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
            leftIcon={icon && icon}
        >
            {title}
        </Button>
    );
};

export default NavLink;