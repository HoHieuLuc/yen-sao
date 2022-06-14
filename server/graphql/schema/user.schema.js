const { authRequired, adminRequired } = require('../../middlewares/authentication');
const userController = require('../../controllers/user.controller');
const chainMiddlewares = require('../../middlewares');
const { gql } = require('apollo-server');

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
        byID(
            id: ObjectID!
        ): User
    }

    extend type Query {
        user: UserQueries
    }

    input UpdateUserInput {
        fullname: String
        email: String
    }

    type UserMutations {
        create(
            username: String!,
            password: String!,
            email: String!,
            fullname: String!,
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
            id: ObjectID!,
            isBanned: Boolean!
        ): User
        update(
            payload: UpdateUserInput!
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
        create: chainMiddlewares(adminRequired, (_, args, { currentUser }) =>
            userController.create(args, currentUser)
        ),
        login: async (_, { username, password }) =>
            userController.login(username, password),
        changePassword: chainMiddlewares(authRequired,
            (_, { oldPassword, newPassword }, { currentUser }) =>
                userController.changePassword(oldPassword, newPassword, currentUser)
        ),
        banByID: chainMiddlewares(adminRequired,
            (_, { id, isBanned }, { currentUser }) =>
                userController.banById(id, isBanned, currentUser)
        ),
        update: (_, { payload }, { currentUser }) =>
            userController.update(payload, currentUser),
    }
};

module.exports = {
    typeDefs,
    resolvers
};