import { gql } from '@apollo/client';

export const CREATE_POST = gql`
    mutation CreatePost($title: String!, $content: String!) {
        createPost(title: $title, content: $content) {
            id
            title
            content
            createdAt
            updatedAt
        }
    }
`;

export const POSTS_LIST = gql`
    query PostsList($page: Int!, $limit: Int!) {
        allPosts(page: $page, limit: $limit) {
            posts {
                id
                title
                createdBy {
                    id
                    username
                }
                createdAt
                updatedAt
            }
            pageInfo {
                page
                totalPages
                limit
                }
            }
        }
`;

export const GET_SINGLE_POST = gql`
    query SinglePost($singlePostId: String!) {
        singlePost(id: $singlePostId) {
            id
            title
            content
            createdBy {
                id
                fullname
            }
            createdAt
            updatedAt
        }
    }
`;