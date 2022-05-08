import {
    Header,
    Text,
    MediaQuery,
    Burger,
    useMantineColorScheme,
    ActionIcon,
    MantineTheme
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
    const dark = colorScheme === 'dark';

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
                <Text
                    ml='auto'
                    color='white'
                    component='a'
                    rel='noreferrer'
                    href='https://studio.apollographql.com/sandbox/explorer?endpoint=http%3A%2F%2Flocalhost%3A4000%2Fgql'
                    target='_blank'
                >
                    <h2>Studio (REMOVE IN PROD)</h2>
                </Text>
                <ActionIcon
                    variant={dark ? 'outline' : 'filled'}
                    color={dark ? 'yellow' : 'violet'}
                    onClick={() => toggleColorScheme()}
                    title="Thay đổi màu nền"
                    ml='auto'
                    size='md'
                >
                    {dark ? <FontAwesomeIcon icon={faSun} /> : <FontAwesomeIcon icon={faMoon} />}
                </ActionIcon>
            </div>
        </Header>
    );
};

export default AppHeader;