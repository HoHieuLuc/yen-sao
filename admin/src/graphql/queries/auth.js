import { gql } from '@apollo/client';

export const LOGIN = gql`
    mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            value
        }
    }
`;

export const ME = gql`
    query Me {
        me {
            id
            role
            fullname
            username
        }
    }
`;