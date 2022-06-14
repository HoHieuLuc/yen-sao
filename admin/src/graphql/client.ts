import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createUploadLink } from 'apollo-upload-client';
import { OutgoingHttpHeaders } from 'http2';
import appConfig from '../config';

const httpLink: ApolloLink = createUploadLink({
    uri: `${appConfig.apiURL}/gql`,
    headers: {
        'Apollo-Require-Preflight': 'true',
    }
});

const authLink: ApolloLink = setContext((_, { headers }: { headers: OutgoingHttpHeaders }) => {
    const token = localStorage.getItem('token');
    return {
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
                sanPham: {
                    merge: true,
                },
                phieuNhap: {
                    merge: true
                },
                phieuXuat: {
                    merge: true
                },
                chiTietPhieuNhap: {
                    merge: true
                },
                chiTietPhieuXuat: {
                    merge: true
                },
                user: {
                    merge: true
                },
                activityLog: {
                    merge: true
                },
                page: {
                    merge: true
                },
                camNang: {
                    merge: true
                }
            }
        },
        PhieuNhap: {
            fields: {
                chiTiet: {
                    merge: false
                }
            }
        },
        PhieuXuat: {
            fields: {
                chiTiet: {
                    merge: false
                }
            }
        },
        ActivityLog: {
            fields: {
                description: {
                    merge: true
                }
            }
        },
        ActivityDescription: {
            keyFields: false
        },
        Page: {
            fields: {
                content: {
                    merge: false
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