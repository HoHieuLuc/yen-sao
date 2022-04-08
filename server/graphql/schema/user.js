const { gql } = require('apollo-server');
const { createUser, login } = require('../../controllers/user');
const chainMiddlewares = require('../../middlewares');
const authRequired = require('../../middlewares/authentication');

const typeDefs = gql`
    type User {
        id: ID!
        username: String!
        email: String!
        fullname: String!
        role: String!
    }

    extend type Query {
        me: User
        test: String
    }

    extend type Mutation {
        createUser(
            username: String!,
            password: String!,
            email: String!,
            fullname: String!,
            role: String
        ): User
        login (
            username: String!,
            password: String!
        ): Token
    }
`;

const resolvers = {
    Query: {
        me: (_root, _args, context) => {
            return context.currentUser;
        },
        // test chainMiddlewares
        test: chainMiddlewares(authRequired, () => 'ok')
    },
    Mutation: {
        createUser: async (_root, args) => {
            return createUser(args);
        },
        login: async (_root, { username, password }) => {
            return login(username, password);
        }
    }
};

module.exports = {
    typeDefs,
    resolvers
};