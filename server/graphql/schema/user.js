const { gql } = require('apollo-server');
const userController = require('../../controllers/user.controller');
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

    type UserQueries {
        me: User
    }

    extend type Query {
        user: UserQueries
    }

    type UserMutations {
        create(
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

    extend type Mutation {
        user: UserMutations
    }
`;

const resolvers = {
    Query: {
        user: () => ({})
    },
    UserQueries: {
        me: (_, __, context) => {
            return context.currentUser;
        },
    },
    Mutation: {
        user: () => ({})
    },
    UserMutations: {
        create: chainMiddlewares(authRequired,
            (_, args) => userController.create(args)
        ),
        login: async (_, { username, password }) => userController.login(username, password)
    }
};

module.exports = {
    typeDefs,
    resolvers
};