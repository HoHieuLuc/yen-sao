const { gql } = require('apollo-server');

const typeDefs = gql`
    type PageInfo {
        page: Int!
        totalPages: Int!
        limit: Int!
    }
`;

module.exports = {
    typeDefs
};