import {
    Navbar,
    ScrollArea,
    Divider,
    Text
} from '@mantine/core';
import NavLinks from './NavLinks/NavLinks';
import NavLink from './NavLinks/NavLink';
import { useApolloClient } from '@apollo/client';
import { ME } from '../../graphql/queries/auth';

const AppNavbar = ({ opened }) => {
    const client = useApolloClient();
    const { me } = client.readQuery({ query: ME });
    return (
        <Navbar
            p="sm"
            hiddenBreakpoint="sm"
            hidden={!opened}
            width={{ sm: 200, lg: 300 }}
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