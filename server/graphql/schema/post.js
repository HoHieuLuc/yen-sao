const { gql } = require('apollo-server');
const chainMiddlewares = require('../../middlewares');
const authRequired = require('../../middlewares/authentication');
const { createPost, getAllPosts, getPost } = require('../../controllers/post');

const typeDefs = gql`
    type Post {
        id: ID!
        title: String!
        content: String!
        createdBy: User!
        createdAt: Date!
        updatedAt: Date!
    }

    type PostByPage {
        posts: [Post!]!
        pageInfo: PageInfo!
    }

    extend type Query {
        allPosts(
            page: Int!
            limit: Int!
        ): PostByPage
        singlePost(id: String!): Post
    }

    extend type Mutation {
        createPost(
            title: String!
            content: String!
        ): Post
    }
`;

const resolvers = {
    PostByPage: {
        posts: (root) => root.docs,
        pageInfo: (root) => root,
    },
    Query: {
        allPosts: async (_, { page, limit }) => getAllPosts(page, limit),
        singlePost: async (_, { id }) => getPost(id)
    },
    Mutation: {
        createPost: chainMiddlewares(authRequired, (_, args, { currentUser }) => {
            return createPost(args, currentUser.id);
        })
    }
};

module.exports = {
    typeDefs,
    resolvers
};