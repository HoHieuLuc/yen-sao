const { gql } = require('apollo-server-express');
const { GraphQLUpload } = require('graphql-upload');
const chainMiddlewares = require('../../middlewares/index');
const authRequired = require('../../middlewares/authentication');
const { singleUpload } = require('../../controllers/upload.controller');

const typeDefs = gql`
    scalar Upload

    type File {
        filename: String!
        mimetype: String!
        encoding: String!
    }

    type UploadMutations {
        singleUpload(file: Upload!): String
    }

    extend type Mutation {
        upload: UploadMutations
    }
`;

const resolvers = {
    Upload: GraphQLUpload,
    Mutation: {
        upload: chainMiddlewares(authRequired,
            () => ({})
        ),
    },
    UploadMutations: {
        singleUpload: async (_, { file }) =>
            singleUpload(file),
    }
};

module.exports = {
    typeDefs,
    resolvers
};