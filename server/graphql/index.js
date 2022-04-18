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
const {
    typeDefs: Post,
    resolvers: postResolvers
} = require('./schema/post');
const {
    typeDefs: Paginatable
} = require('./schema/paginate');
const {
    typeDefs: dateScalar,
    resolvers: dateResolvers
} = require('./scalar/date');

const defaultSchema = gql`
    type Query {
        _empty: String
    }

    type Mutation {
        _empty: String
    }
`;

const schema = makeExecutableSchema({
    typeDefs: [defaultSchema, dateScalar, Paginatable, User, Token, File, Post],
    resolvers: merge(
        dateResolvers,
        userResolvers,
        fileResolvers,
        postResolvers
    )
});

module.exports = schema;