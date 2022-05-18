import { gql, useMutation, useQuery } from '@apollo/client';
import { showErrorNotification, showSuccessNotification } from '../../events';

const PAGE_BY_NAME = gql`
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

const CREATE_OR_UPDATE_PAGE = gql`
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

const usePageByName = <T>(name: string) => {
    return useQuery<
        T, { name: string }
    >(PAGE_BY_NAME,
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
    >(CREATE_OR_UPDATE_PAGE, {
        onCompleted: () => showSuccessNotification('Cập nhật thành công'),
        onError: (error) => showErrorNotification(error.message)
    });
};

export const pageHooks = {
    useCreateOrUpdatePage,
    usePageByName,
};