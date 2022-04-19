import React from 'react';
import {
    Header,
    Text,
    MediaQuery,
    Burger,
    useMantineColorScheme,
    ActionIcon
} from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import appConfig from '../../config';

const AppHeader = ({ theme, opened, setOpened }) => {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';

    return (
        <Header sx={{ background: theme.colors.blue[5] }} height={50} p="sm">
            <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                    <Burger
                        opened={opened}
                        onClick={() => setOpened((o) => !o)}
                        size="sm"
                        color={theme.colors.gray[6]}
                        mr="xl"
                    />
                </MediaQuery>
                <Text color='white' component={Link} to='/'>
                    <h2>{appConfig.title}</h2>
                </Text>
                <ActionIcon
                    variant="outline"
                    color={dark ? 'yellow' : 'blue'}
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