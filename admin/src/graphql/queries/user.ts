import { gql, useMutation, useQuery } from '@apollo/client';
import { showErrorNotification, showSuccessNotification } from '../../events';
import { AllUsers, AllUsersVars, BanByIdVars, User } from '../../types';

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
    mutation User($id: ID!, $isBanned: Boolean!) {
        user {
            banByID(id: $id, isBanned: $isBanned) {
                id
                username
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
    useBanUser
};