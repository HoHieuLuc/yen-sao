import React from 'react';
import {
    Header,
    Text,
    MediaQuery,
    Burger,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import appConfig from '../../config';

const AppHeader = ({ theme, opened, setOpened }) => {
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
                <Text color='white' component={Link} to='/dashboard'><h2>{appConfig.title}</h2></Text>
            </div>
        </Header>
    );
};

export default AppHeader;