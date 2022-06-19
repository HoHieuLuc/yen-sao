import { useState } from 'react';

import { AppShell, Container, useMantineTheme } from '@mantine/core';
import AppSection from './Routes/Routes';
import AppNavbar from './Navbar/Navbar';
import AppHeader from './Header/Header';

const Admin = () => {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    return (
        <AppShell
            navbarOffsetBreakpoint='md'
            fixed
            navbar={
                <AppNavbar
                    opened={opened}
                />
            }
            header={
                <AppHeader theme={theme} opened={opened} setOpened={setOpened} />
            }
        >
            <Container size='xl' p={0}>
                <AppSection />
            </Container>
        </AppShell>
    );
};

export default Admin;