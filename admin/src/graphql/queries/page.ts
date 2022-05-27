import { gql, useApolloClient, useMutation, useQuery } from '@apollo/client';
import { showErrorNotification, showSuccessNotification } from '../../events';
import { AllPages, CreateOrUpdatePage } from '../../types';

const ALL = gql`
    query AllPages {
        page {
            about: byName(name: "about") {
                id
                name
                content
            }
            address: byName(name: "address") {
                id
                name
                content
            }
            phone: byName(name: "phone") {
                id
                name
                content
            }
            facebook: byName(name: "facebook") {
                id
                name
                content
            }
        }
    }
`;

const BY_NAME = gql`
    query PageByName($name: String!) {
        page {
            byName(name: $name) {
                id
                name
                content
            }
        }
    }
`;

const CREATE_OR_UPDATE = gql`
    mutation CreateOrUpdatePage($name: String!, $content: Object!) {
        page {
            createOrUpdate(name: $name, content: $content) {
                id
                name
                content
            }
        }
    }
`;

const useAllPages = () => {
    return useQuery<AllPages>(ALL);
};

const usePageByName = <T>(name: string) => {
    return useQuery<
        T, { name: string }
    >(BY_NAME,
        {
            variables: {
                name
            }
        }
    );
};

const useCreateOrUpdatePage = <T, V>() => {
    const client = useApolloClient();
    return useMutation<
        CreateOrUpdatePage<T>, V
    >(CREATE_OR_UPDATE, {
        onCompleted: (data) => {
            showSuccessNotification('Cập nhật thành công');
            client.writeQuery({
                query: BY_NAME,
                data: {
                    page: {
                        byName: {
                            __typename: 'Page',
                            ...data.page.createOrUpdate
                        }
                    }
                },
                variables: {
                    name: data.page.createOrUpdate.name
                }
            });
        },
        onError: (error) => showErrorNotification(error.message)
    });
};

export const pageHooks = {
    useCreateOrUpdatePage,
    usePageByName,
    useAllPages,
};