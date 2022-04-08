const { makeExecutableSchema } = require('@graphql-tools/schema');
const { merge } = require('lodash');
const { gql } = require('apollo-server');

const defaultSchema = gql`
    type Query {
        _empty: String
    }

    type Mutation {
        _empty: String
    }
`;

const schema = makeExecutableSchema({
    typeDefs: [defaultSchema],
    resolvers: merge({})
});

module.exports = schema;