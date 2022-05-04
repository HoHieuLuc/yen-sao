import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { NotificationsProvider } from '@mantine/notifications';
import { useLocalStorage } from '@mantine/hooks';

interface Props {
    children: JSX.Element;
}

const MyMantineProvider = ({ children }: Props) => {
    const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
        key: 'mantine-color-scheme',
        defaultValue: 'light',
        getInitialValueInEffect: true,
    });

    const toggleColorScheme = (value: ColorScheme) =>
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

    return (
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider
                theme={{
                    spacing: { xs: 15, sm: 20, md: 25, lg: 30, xl: 40 },
                    colorScheme,
                    datesLocale: 'vi',
                }}
                withGlobalStyles
            >
                <NotificationsProvider autoClose={5000} zIndex={9999}>
                    <ModalsProvider>
                        {children}
                    </ModalsProvider>
                </NotificationsProvider>
            </MantineProvider>
        </ColorSchemeProvider>
    );
};

export default MyMantineProvider;