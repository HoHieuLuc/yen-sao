import appConfig from '../../../../config';
import NavLink from './NavLink';
import { SimpleGrid } from '@mantine/core';

const NavLinks = () => {
    return (
        <SimpleGrid cols={1} spacing={4}>
            {appConfig.links.map(link => {
                if (link.type === 'hidden') {
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