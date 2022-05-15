const { gql } = require('apollo-server');
const userController = require('../../controllers/user.controller');
const chainMiddlewares = require('../../middlewares');
const { authRequired, adminRequired } = require('../../middlewares/authentication');

const typeDefs = gql`
    type User {
        id: ID!
        username: String!
        email: String!
        fullname: String!
        role: String!
        isBanned: Boolean!
    }

    type UsersByPage {
        docs: [User!]!
        pageInfo: PageInfo!
    }

    type UserQueries {
        me: User
        all(
            page: Int!,
            limit: Int!,
            search: String
        ): UsersByPage!
        byID(id: ID!): User
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
        changePassword (
            oldPassword: String!,
            newPassword: String!
        ): User
        banByID(
            id: ID!,
            isBanned: Boolean!
        ): User
    }

    extend type Mutation {
        user: UserMutations
    }
`;

const resolvers = {
    UsersByPage: {
        pageInfo: (root) => root
    },
    Query: {
        user: () => ({})
    },
    UserQueries: {
        me: (_, __, context) => {
            return context.currentUser;
        },
        all: chainMiddlewares(adminRequired, (_, { page, limit, search }) =>
            userController.getAll(page, limit, search)
        ),
        byID: chainMiddlewares(adminRequired, (_, { id }) =>
            userController.getById(id)
        ),
    },
    Mutation: {
        user: () => ({})
    },
    UserMutations: {
        create: chainMiddlewares(adminRequired, (_, args) =>
            userController.create(args)
        ),
        login: async (_, { username, password }) =>
            userController.login(username, password),
        changePassword: chainMiddlewares(authRequired,
            (_, { oldPassword, newPassword }, { currentUser }) =>
                userController.changePassword(currentUser.username, oldPassword, newPassword)
        ),
        banByID: chainMiddlewares(adminRequired, (_, { id, isBanned }, { currentUser }) => 
            userController.banById(id, isBanned, currentUser._id)
        )
    }
};

module.exports = {
    typeDefs,
    resolvers
};