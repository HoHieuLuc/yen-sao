import { gql, useMutation, useQuery } from '@apollo/client';
import { showErrorNotification, showSuccessNotification } from '../../events';
import { AllUsers, AllUsersVars, BanByIdVars, User, UserById } from '../../types';

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

const useAllUsers = (variables: AllUsersVars) => {
    return useQuery<
        AllUsers
    >(ALL, {
        variables
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

export const userHooks = {
    useAllUsers,
    useUserById,
    useBanUser,
};