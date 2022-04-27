import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from '../graphql/client';
import { BrowserRouter } from 'react-router-dom';
import MyMantineProvider from './Mantine';

interface Props {
    children: JSX.Element;
}

const Provider = ({ children }: Props) => {
    return (
        <BrowserRouter>
            <ApolloProvider client={client}>
                <MyMantineProvider>
                    {children}
                </MyMantineProvider>
            </ApolloProvider>
        </BrowserRouter>
    );
};

export default Provider;