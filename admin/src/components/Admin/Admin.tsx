import { useState } from 'react';

import { AppShell, useMantineTheme } from '@mantine/core';
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
            <AppSection />
        </AppShell>
    );
};

export default Admin;