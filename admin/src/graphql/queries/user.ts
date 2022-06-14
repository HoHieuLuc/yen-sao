import { gql, useMutation, useQuery } from '@apollo/client';
import { showErrorNotification, showSuccessNotification } from '../../events';
import {
    AllUsersVars, CreateUserVars, UpdateUserVars,
    User, AllUsers, UserById, BanByIdVars
} from '../../types';

const ALL = gql`
    query AllUsers($page: Int!, $limit: Int!, $search: String) {
        user {
            all(page: $page, limit: $limit, search: $search) {
                docs {
                    id
                    username
                    email
                    fullname
                    role
                    isBanned
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

const BAN_BY_ID = gql`
    mutation BanUser($id: ObjectID!, $isBanned: Boolean!) {
        user {
            banByID(id: $id, isBanned: $isBanned) {
                id
                username
                isBanned
            }
        }
    }
`;

const BY_ID = gql`
    query UserByID($id: ObjectID!) {
        user {
            byID(id: $id) {
                id
                username
                email
                fullname
                role
                isBanned
            }
        }
    }
`;

const CREATE = gql`
    mutation CreateUser($username: String!, $password: String!, $email: String!, $fullname: String!) {
        user {
            create(username: $username, password: $password, email: $email, fullname: $fullname) {
                id
                username
                email
                fullname
                role
                isBanned
            }
        }
    }
`;

const UPDATE = gql`
    mutation UpdateUser($payload: UpdateUserInput!) {
        user {
            update(payload: $payload) {
                id
                email
                fullname
            }
        }
    }
`;

const useAllUsers = (variables: AllUsersVars) => {
    return useQuery<
        AllUsers
    >(ALL, {
        variables,
        fetchPolicy: 'cache-and-network'
    });
};

const useUserById = (id: string) => {
    return useQuery<
        UserById, { id: string }
    >(BY_ID, {
        variables: { id }
    });
};

const useBanUser = () => {
    return useMutation<
        { user: { banByID: User } }, BanByIdVars
    >(BAN_BY_ID, {
        onCompleted: ({ user: { banByID } }) => {
            showSuccessNotification(
                `${banByID.isBanned
                    ? 'Khóa'
                    : 'Mở khóa'} thành công tài khoản ${banByID.username}`
            );
        },
        onError: (error) => showErrorNotification(error.message)
    });
};

const useCreateUser = () => {
    return useMutation<
        never, CreateUserVars
    >(CREATE, {
        onCompleted: () => showSuccessNotification('Tạo tài khoản thành công'),
        onError: (error) => showErrorNotification(error.message),
        refetchQueries: [ALL],
    });
};

const useUpdateUser = () => {
    return useMutation<
        never, UpdateUserVars
    >(UPDATE, {
        onCompleted: () => showSuccessNotification('Cập nhật thông tin thành công'),
        onError: (error) => showErrorNotification(error.message),
    });
};

export const userHooks = {
    useCreateUser,
    useUpdateUser,
    useAllUsers,
    useUserById,
    useBanUser,
};