const { gql } = require('apollo-server-express');
const { GraphQLUpload } = require('graphql-upload');
const chainMiddlewares = require('../../middlewares/index');
const authRequired = require('../../middlewares/authentication');
const { singleUpload } = require('../../controllers/upload');

const typeDefs = gql`
    scalar Upload

    type File {
        filename: String!
        mimetype: String!
        encoding: String!
    }

    extend type Mutation {
        singleUpload(file: Upload!): String
    }
`;

const resolvers = {
    Upload: GraphQLUpload,

    Mutation: {
        singleUpload: chainMiddlewares(authRequired, (_, {file}) => {
            return singleUpload(file);
        })
    }
};

module.exports = {
    typeDefs,
    resolvers
};