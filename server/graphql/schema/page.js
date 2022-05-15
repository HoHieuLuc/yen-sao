const { gql } = require('apollo-server-express');
const chainMiddlewares = require('../../middlewares/index');
const { adminRequired } = require('../../middlewares/authentication');
const pageController = require('../../controllers/page.controller');

const typeDefs = gql`
    type Page {
        id: ID!
        name: String!
        content: Object!
    }

    type PageQueries {
        byName(
            name: String!
        ): Page
    }

    type PageMutations {
        createOrUpdate(
            name: String!,
            content: Object!
        ): Page
    }

    extend type Query {
        page: PageQueries
    }

    extend type Mutation {
        page: PageMutations
    }
`;

const resolvers = {
    Query: {
        page: () => ({})
    },
    PageQueries: {
        byName: async (_, { name }) =>
            pageController.getByName(name),
    },
    Mutation: {
        page: chainMiddlewares(adminRequired,
            () => ({})
        ),
    },
    PageMutations: {
        createOrUpdate: async (_, { name, content }) =>
            pageController.createOrUpdate(name, content)
    }
};

module.exports = {
    typeDefs,
    resolvers
};