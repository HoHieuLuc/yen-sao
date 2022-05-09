const { gql } = require('apollo-server-express');
const chainMiddlewares = require('../../middlewares/index');
const authRequired = require('../../middlewares/authentication');
const configController = require('../../controllers/config.controller');

const typeDefs = gql`
    type Config {
        id: ID!
        name: String!
        content: Object!
    }

    type ConfigQueries {
        byName(
            name: String!
        ): Config
    }

    type ConfigMutations {
        createOrUpdate(
            name: String!,
            content: Object!
        ): Config
    }

    extend type Query {
        config: ConfigQueries
    }

    extend type Mutation {
        config: ConfigMutations
    }
`;

const resolvers = {
    Query: {
        config: () => ({})
    },
    ConfigQueries: {
        byName: async (_, { name }) =>
            configController.getByName(name),
    },
    Mutation: {
        config: chainMiddlewares(authRequired,
            () => ({})
        ),
    },
    ConfigMutations: {
        createOrUpdate: async (_, { name, content }) =>
            configController.createOrUpdate(name, content)
    }
};

module.exports = {
    typeDefs,
    resolvers
};