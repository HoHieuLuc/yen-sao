const { gql } = require('apollo-server-express');
const { GraphQLUpload } = require('graphql-upload');
const { finished } = require('stream/promises');
const path = require('path');
const fs = require('fs');
const { nanoid } = require('nanoid');

const typeDefs = gql`
    scalar Upload

    type File {
        filename: String!
        mimetype: String!
        encoding: String!
    }

    type Query {
        testUpload: Boolean!
    }

    type Mutation {
        singleUpload(file: Upload!): File!
    }
`;

const resolvers = {
    Upload: GraphQLUpload,

    Mutation: {
        singleUpload: async (root, { file }) => {
            const { createReadStream, filename, mimetype, encoding } = await file;

            const stream = createReadStream();
            const pathName = path.join(
                __dirname,
                `../../public/uploads/${nanoid(12)}.${filename}`
            );

            const out = fs.createWriteStream(pathName);
            stream.pipe(out);
            await finished(out);

            return { filename, mimetype, encoding };
        }
    }
};

module.exports = {
    typeDefs,
    resolvers
};