import { gql } from '@apollo/client';

export const LOGIN = gql`
    mutation Login($username: String!, $password: String!) {
        user {
            login(username: $username, password: $password) {
                value
            }
        }
    }
`;

export const ME = gql`
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