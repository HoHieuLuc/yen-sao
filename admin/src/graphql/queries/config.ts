import { gql } from '@apollo/client';

const CONFIG_BY_NAME = gql`
    query ConfigByName($name: String!) {
        config {
            byName(name: $name) {
                id
                name
                content
            }
        }
    }
`;

const CREATE_OR_UPDATE_CONFIG = gql`
    mutation CreateOrUpdateConfig($name: String!, $content: Object!) {
        config {
            createOrUpdate(name: $name, content: $content) {
                id
                name
                content
            }
        }
    }
`;

export const configQuery = {
    CONFIG_BY_NAME,
    CREATE_OR_UPDATE_CONFIG
};