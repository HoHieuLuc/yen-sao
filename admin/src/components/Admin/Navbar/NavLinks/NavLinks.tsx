import { SimpleGrid } from '@mantine/core';
import NavLink from './NavLink';

import { authHooks } from '../../../../graphql/queries';
import appConfig from '../../../../config';

const NavLinks = () => {
    const me = authHooks.useReadCurrentUser();

    return (
        <SimpleGrid cols={1} spacing={4}>
            {appConfig.links.map(link => {
                if (link.type === 'hidden') {
                    return null;
                }
                if (link.roles && !link.roles.includes(me.role)) {
                    return null;
                }
                return (
                    <NavLink
                        key={link.title}
                        {...link}
                        size='md'
                    />
                );
            })}
        </SimpleGrid>
    );
};

export default NavLinks;