import {
    useMantineColorScheme,
    SegmentedControl,
    MediaQuery,
    MantineTheme,
    Header,
    Burger,
    Center,
    Text,
    Box,
} from '@mantine/core';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import appConfig from '../../../config';

interface Props {
    theme: MantineTheme;
    opened: boolean;
    setOpened: (_o: boolean) => void;
}

const AppHeader = ({ theme, opened, setOpened }: Props) => {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();

    return (
        <Header sx={{ background: theme.colors.blue[5], zIndex: 500 }} height={50} p='sm'>
            <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                <MediaQuery largerThan='md' styles={{ display: 'none' }}>
                    <Burger
                        opened={opened}
                        onClick={() => setOpened(!opened)}
                        size='sm'
                        color='white'
                        mr='xl'
                    />
                </MediaQuery>
                <Text
                    color='white'
                    component={Link} to='/'
                    weight={700}
                    size='xl'
                >
                    {appConfig.title}
                </Text>
                <SegmentedControl
                    ml='auto'
                    value={colorScheme}
                    onChange={(value) => toggleColorScheme(
                        value === 'light' ? 'light' : 'dark'
                    )}
                    data={[
                        {
                            value: 'light',
                            label: (
                                <Center>
                                    <FontAwesomeIcon color='yellow' icon={faSun} />
                                    <Box
                                        ml={10}
                                        sx={(theme) => ({
                                            [theme.fn.smallerThan('sm')]: {
                                                display: 'none'
                                            }
                                        })}
                                    >
                                        Sáng
                                    </Box>
                                </Center>
                            ),
                        },
                        {
                            value: 'dark',
                            label: (
                                <Center>
                                    <FontAwesomeIcon icon={faMoon} />
                                    <Box
                                        ml={10}
                                        sx={(theme) => ({
                                            [theme.fn.smallerThan('sm')]: {
                                                display: 'none'
                                            }
                                        })}
                                    >
                                        Tối
                                    </Box>
                                </Center>
                            ),
                        },
                    ]}
                />
            </div>
        </Header>
    );
};

export default AppHeader;