const { makeExecutableSchema } = require('@graphql-tools/schema');
const { merge } = require('lodash');
const { gql } = require('apollo-server');

const {
    typeDefs: User,
    resolvers: userResolvers
} = require('./schema/user');
const {
    typeDefs: Token
} = require('./schema/token');
const {
    typeDefs: File,
    resolvers: fileResolvers
} = require('./schema/file');

const defaultSchema = gql`
    type Query {
        _empty: String
    }

    type Mutation {
        _empty: String
    }
`;

const schema = makeExecutableSchema({
    typeDefs: [defaultSchema, User, Token, File],
    resolvers: merge(userResolvers, fileResolvers)
});

module.exports = schema;