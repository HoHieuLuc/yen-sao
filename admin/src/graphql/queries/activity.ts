import { gql, useApolloClient, useMutation, useQuery } from '@apollo/client';
import { showErrorNotification, showSuccessNotification } from '../../events';
import {
    AllActivities,
    AllActivitiesVars,
    ActivitiesByUserIdVars,
    ActivitiesByUserId,
    ActivityById,
    ActivitiesByDocumentId,
    ActivitiesByDocumentIdVars
} from '../../types';

const ALL = gql`
    query AllActivities($page: Int!, $limit: Int!) {
        activityLog {
            all(page: $page, limit: $limit) {
                docs {
                    id
                    user {
                        id
                        fullname
                    }
                    action
                    onCollection
                    description {
                        name
                    }
                    createdAt
                }
                pageInfo {
                    page
                    totalPages
                    limit
                    totalDocs
                }
            }
        }
    }
`;

const BY_ID = gql`
    query ActivityByID($id: ID!) {
        activityLog {
            byID(id: $id) {
                id
                user {
                    id
                    fullname
                }
                action
                onCollection
                onDocumentId
                description {
                    name
                    value
                }
                createdAt
            }
        }
    }
`;

const BY_USER_ID = gql`
    query ActivitiesByUserId($page: Int!, $limit: Int!, $userId: ID!) {
        activityLog {
            byUserID(page: $page, limit: $limit, userId: $userId) {
                docs {
                    id
                    user {
                        id
                        fullname
                    }
                    action
                    onCollection
                    description {
                        name
                    }
                    createdAt
                }
                pageInfo {
                    page
                    totalPages
                    limit
                    totalDocs
                }
            }
        }
    }
`;

const BY_DOCUMENT_ID = gql`
    query ByDocumentID($page: Int!, $limit: Int!, $documentId: ID!) {
        activityLog {
            byDocumentID(page: $page, limit: $limit, documentId: $documentId) {
                docs {
                    id
                    user {
                        id
                        fullname
                    }
                    action
                    onCollection
                    description {
                        name
                    }
                    createdAt
                }
                pageInfo {
                    page
                    totalPages
                    limit
                    totalDocs
                }
            }
        }
    }
`;

const DELETE = gql`
    mutation DeleteActivities($from: Date, $to: Date) {
        activityLog {
            delete(from: $from, to: $to)
        }
    }
`;

const useAllActivities = (variables: AllActivitiesVars) => {
    return useQuery<
        AllActivities, AllActivitiesVars
    >(ALL, {
        variables,
        fetchPolicy: 'cache-and-network',
    });
};

const useActivityById = (id: string) => {
    return useQuery<
        ActivityById, { id: string }
    >(BY_ID, {
        variables: {
            id
        }
    });
};

const useActivitiesByUserId = (variables: ActivitiesByUserIdVars) => {
    return useQuery<
        ActivitiesByUserId, ActivitiesByUserIdVars
    >(BY_USER_ID, {
        variables,
        fetchPolicy: 'cache-and-network'
    });
};

const useActivitiesByDocumentId = (variables: ActivitiesByDocumentIdVars) => { 
    return useQuery<
        ActivitiesByDocumentId, ActivitiesByDocumentIdVars
    >(BY_DOCUMENT_ID, {
        variables,
        fetchPolicy: 'cache-and-network'
    });
};

const useDeleteActivities = () => {
    const client = useApolloClient();
    return useMutation<
        never, { from: Date | null, to: Date | null }
    >(DELETE, {
        onCompleted: () => {
            showSuccessNotification('Dọn dẹp lịch sử hoạt động thành công');
            client.cache.evict({
                id: 'ROOT_QUERY',
                fieldName: 'activityLog',
            });
            client.cache.gc();
        },
        onError: (error) => showErrorNotification(error.message)
    });
};

export const activityHooks = {
    useActivitiesByDocumentId,
    useActivitiesByUserId,
    useDeleteActivities,
    useAllActivities,
    useActivityById,
};