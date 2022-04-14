import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from '@apollo/client/link/context';

const httpLink = new createUploadLink({
    uri: 'http://localhost:4000/gql'
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            ...headers,
            authorization: token ? `bearer ${token}` : null,
        }
    };
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink)
});

export default client;