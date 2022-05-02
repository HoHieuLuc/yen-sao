import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from '@apollo/client/link/context';
import appConfig from '../config';

const httpLink = createUploadLink({
    uri: `${appConfig.apiURL}/gql`
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
    return {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        headers: {
            ...headers,
            authorization: token ? `bearer ${token}` : null,
        }
    };
});

const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                loaiSanPham: {
                    merge: true,
                },
                sanPham: {
                    merge: true
                },
                phieuNhap: {
                    merge: true
                }
            }
        }
    }
});

const client = new ApolloClient({
    cache: cache,
    link: authLink.concat(httpLink)
});

export default client;