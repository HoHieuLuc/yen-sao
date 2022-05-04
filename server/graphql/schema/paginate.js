const { gql } = require('apollo-server');

const typeDefs = gql`
    type PageInfo {
        page: Int!
        totalPages: Int!
        limit: Int!
        totalDocs: Int!
    }
`;

module.exports = {
    typeDefs
};