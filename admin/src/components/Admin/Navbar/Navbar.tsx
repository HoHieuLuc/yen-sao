import { useApolloClient } from '@apollo/client';

import { Navbar, ScrollArea, Divider, Text } from '@mantine/core';
import NavLinks from './NavLinks/NavLinks';
import NavLink from './NavLinks/NavLink';

import { authQuery } from '../../../graphql/queries';
import { User } from '../../../types';

interface Props {
    opened: boolean;
}

const AppNavbar = ({ opened }: Props) => {
    const client = useApolloClient();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { user: { me } } = client.readQuery<
        { user: { me: User } }
    >({ query: authQuery.ME })!;
    
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