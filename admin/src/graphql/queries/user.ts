import { gql, useMutation, useQuery } from '@apollo/client';
import { showErrorNotification, showSuccessNotification } from '../../events';
import { AllUsers, AllUsersVars, BanByIdVars, CreateUserVars, User, UserById } from '../../types';

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
    mutation BanUser($id: ID!, $isBanned: Boolean!) {
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
    query UserByID($id: ID!) {
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
    mutation Create($username: String!, $password: String!, $email: String!, $fullname: String!) {
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

export const userHooks = {
    useCreateUser,
    useAllUsers,
    useUserById,
    useBanUser,
};