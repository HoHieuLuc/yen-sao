import { gql, useApolloClient, useMutation, useQuery } from '@apollo/client';
import { showErrorNotification, showSuccessNotification } from '../../events';
import {
    AllActivities,
    AllActivitiesVars,
    ActivitiesByUserIdVars,
    ActivitiesByUserId,
    ActivityById
} from '../../types';

const ALL = gql`
    query AllActivities($page: Int!, $limit: Int!) {
        activityLog {
            all(page: $page, limit: $limit) {
                docs {
                    id
                    userId {
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
                userId {
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
                    userId {
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

const useActivitesByUserId = (variables: ActivitiesByUserIdVars) => {
    return useQuery<
        ActivitiesByUserId, ActivitiesByUserIdVars
    >(BY_USER_ID, {
        variables,
        fetchPolicy: 'cache-and-network'
    });
};

const useDeleteActivites = () => {
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
    useActivitesByUserId,
    useDeleteActivites,
    useAllActivities,
    useActivityById,
};