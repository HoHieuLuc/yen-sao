const { adminRequired } = require('../../middlewares/authentication');
const pageController = require('../../controllers/page.controller');
const chainMiddlewares = require('../../middlewares');
const { gql } = require('apollo-server-express');

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
        all: Object
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
        all: async () => 
            pageController.getAll()
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