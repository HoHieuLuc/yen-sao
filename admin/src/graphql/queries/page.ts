import { gql, useMutation, useQuery } from '@apollo/client';
import { showErrorNotification, showSuccessNotification } from '../../events';
import { AllPages } from '../../types';

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
    query ConfigByName($name: String!) {
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
    mutation CreateOrUpdateConfig($name: String!, $content: Object!) {
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
    return useMutation<
        T, V
    >(CREATE_OR_UPDATE, {
        onCompleted: () => showSuccessNotification('Cập nhật thành công'),
        onError: (error) => showErrorNotification(error.message)
    });
};

export const pageHooks = {
    useCreateOrUpdatePage,
    usePageByName,
    useAllPages,
};