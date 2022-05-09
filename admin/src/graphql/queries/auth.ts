import { gql } from '@apollo/client';

const LOGIN = gql`
    mutation Login($username: String!, $password: String!) {
        user {
            login(username: $username, password: $password) {
                value
            }
        }
    }
`;

const ME = gql`
    query Me {
        user {
            me {
                id
                username
                email
                fullname
                role
            }
        }
    }
`;

const CHANGE_PASSWORD = gql`
    mutation ChangePassword($oldPassword: String!, $newPassword: String!) {
        user {
            changePassword(oldPassword: $oldPassword, newPassword: $newPassword) {
                id
            }
        }
    }
`;

export const authQuery = {
    LOGIN,
    ME,
    CHANGE_PASSWORD
};