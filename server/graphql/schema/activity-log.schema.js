const { gql } = require('apollo-server-express');
const chainMiddlewares = require('../../middlewares/index');
const { adminRequired, authRequired } = require('../../middlewares/authentication');
const activityLogController = require('../../controllers/activity-log.controller');

const typeDefs = gql`
    type ActivityDescription {
        name: String!
        value: Object!
    }

    type ActivityLog {
        id: ID!
        user: User
        action: String!
        onCollection: String!
        onDocumentId: String!
        description: ActivityDescription!
        createdAt: Date!
    }

    type ActivityLogsByPage {
        docs: [ActivityLog!]!
        pageInfo: PageInfo!
    }

    type ActivityLogQueries {
        all(
            page: Int!,
            limit: Int!
        ): ActivityLogsByPage!
        byID(
            id: ID!
        ): ActivityLog
        my(
            page: Int!,
            limit: Int!
        ): ActivityLogsByPage!
        byUserID(
            page: Int!,
            limit: Int!,
            userId: ID!
        ): ActivityLogsByPage!
        byDocumentID(
            page: Int!,
            limit: Int!,
            documentId: ID!
        ): ActivityLogsByPage!
    }

    extend type Query {
        activityLog: ActivityLogQueries
    }

    type ActivityLogMutations {
        delete(
            from: Date,
            to: Date
        ): Boolean
    }

    extend type Mutation {
        activityLog: ActivityLogMutations
    }
`;

const resolvers = {
    ActivityLog: {
        user: (root) => root.userId
    },
    ActivityLogsByPage: {
        pageInfo: (root) => root
    },
    Query: {
        activityLog: chainMiddlewares(authRequired, () => ({}))
    },
    ActivityLogQueries: {
        all: chainMiddlewares(adminRequired,
            (_, { page, limit }) => activityLogController.getAll(page, limit)
        ),
        byID: async (_, { id }) =>
            activityLogController.getById(id),
        my: async (_, { page, limit }, { currentUser }) =>
            activityLogController.my(page, limit, currentUser),
        byUserID: chainMiddlewares(adminRequired, (_, { page, limit, userId }) =>
            activityLogController.getByUserId(page, limit, userId)
        ),
        byDocumentID: async (_, { page, limit, documentId }) =>
            activityLogController.getByDocumentId(page, limit, documentId)
    },
    Mutation: {
        activityLog: chainMiddlewares(adminRequired, () => ({}))
    },
    ActivityLogMutations: {
        delete: async (_, { from, to }) => activityLogController.remove(from, to)
    }
};

module.exports = {
    typeDefs,
    resolvers
};