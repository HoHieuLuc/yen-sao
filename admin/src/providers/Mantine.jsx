import { MantineProvider, ColorSchemeProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { useLocalStorage } from '@mantine/hooks';

const MyMantineProvider = ({ children }) => {
    const [colorScheme, setColorScheme] = useLocalStorage({
        key: 'mantine-color-scheme',
        defaultValue: 'light',
        getInitialValueInEffect: true,
    });

    const toggleColorScheme = (value) =>
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

    return (
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider
                theme={{
                    spacing: { xs: 15, sm: 20, md: 25, lg: 30, xl: 40 },
                    colorScheme
                }}
                withGlobalStyles
            >
                <NotificationsProvider autoClose={5000} zIndex={9999}>
                    {children}
                </NotificationsProvider>
            </MantineProvider>
        </ColorSchemeProvider>
    );
};

export default MyMantineProvider;