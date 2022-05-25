import {
    useMantineColorScheme,
    SegmentedControl,
    MediaQuery,
    MantineTheme,
    Header,
    Burger,
    Center,
    Text,
    Box
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
        <Header sx={{ background: theme.colors.blue[5], zIndex: 500 }} height={50} p="sm">
            <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                    <Burger
                        opened={opened}
                        onClick={() => setOpened(!opened)}
                        size="sm"
                        color={theme.colors.gray[6]}
                        mr="xl"
                    />
                </MediaQuery>
                <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
                    <Text color='white' component={Link} to='/'>
                        <h2>{appConfig.title}</h2>
                    </Text>
                </MediaQuery>
                {/* <Text
                    ml='auto'
                    color='white'
                    component='a'
                    rel='noreferrer'
                    href='https://studio.apollographql.com/sandbox/explorer?endpoint=http%3A%2F%2Flocalhost%3A4000%2Fgql'
                    target='_blank'
                >
                    <h2>Studio (REMOVE IN PROD)</h2>
                </Text> */}
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