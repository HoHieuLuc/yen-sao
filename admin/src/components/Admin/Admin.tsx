import React, { useState } from 'react';
import {
    AppShell,
    useMantineTheme,
} from '@mantine/core';
import AppNavbar from '../Navbar/Navbar';
import AppHeader from '../Header/Header';
import AppSection from '../Routes/Section';

const Admin = () => {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    return (
        <AppShell
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            fixed
            navbar={
                <AppNavbar opened={opened} />
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