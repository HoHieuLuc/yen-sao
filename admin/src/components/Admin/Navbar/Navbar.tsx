import { Navbar, ScrollArea, Divider, Text } from '@mantine/core';
import NavLinks from './NavLinks/NavLinks';
import NavLink from './NavLinks/NavLink';

import { authHooks } from '../../../graphql/queries';

interface Props {
    opened: boolean;
}

const AppNavbar = ({ opened }: Props) => {
    const me = authHooks.useReadCurrentUser();
    return (
        <Navbar
            p="sm"
            hiddenBreakpoint="md"
            hidden={!opened}
            width={{ sm: 300, md: 300 }}
            style={{
                zIndex: opened ? 100 : 0
            }}
        >
            <Navbar.Section>
                <Text>
                    Xin chào {me.fullname}
                </Text>
            </Navbar.Section>
            <Divider my='xs' />
            <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
                <NavLinks />
            </Navbar.Section>
            <Divider my='xs' />
            <Navbar.Section>
                <NavLink
                    title='Đăng xuất'
                    to='/logout'
                    size='md'
                    color='red'
                />
            </Navbar.Section>
        </Navbar>
    );
};

export default AppNavbar;