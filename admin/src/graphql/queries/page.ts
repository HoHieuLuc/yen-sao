import { gql } from '@apollo/client';

const PAGE_BY_NAME = gql`
    query ConfigByName($name: String!) {
        page {
            byName(name: $name) {
                id
                name
                content
            }
        }
    }
`;

const CREATE_OR_UPDATE_PAGE = gql`
    mutation CreateOrUpdateConfig($name: String!, $content: Object!) {
        page {
            createOrUpdate(name: $name, content: $content) {
                id
                name
                content
            }
        }
    }
`;

export const pageQuery = {
    PAGE_BY_NAME,
    CREATE_OR_UPDATE_PAGE
};