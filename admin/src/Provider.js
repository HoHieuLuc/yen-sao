import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './graphql/client';
import { BrowserRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

const Provider = ({ children }) => {
    return (
        <BrowserRouter>
            <ApolloProvider client={client}>
                <MantineProvider
                    theme={{
                        spacing: { xs: 15, sm: 20, md: 25, lg: 30, xl: 40 },
                    }}
                >
                    <NotificationsProvider autoClose={5000}>
                        {children}
                    </NotificationsProvider>
                </MantineProvider>
            </ApolloProvider>
        </BrowserRouter>
    );
};

export default Provider;