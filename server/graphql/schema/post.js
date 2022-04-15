const { gql } = require('apollo-server');
const chainMiddlewares = require('../../middlewares');
const authRequired = require('../../middlewares/authentication');
const { createPost } = require('../../controllers/post');

const typeDefs = gql`
    type Post {
        id: ID!
        title: String!
        content: String!
        createdBy: User!
        createdAt: String!
        updatedAt: String!
    }

    extend type Mutation {
        createPost(
            title: String!
            content: String!
        ): Post
    }
`;

const resolvers = {
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