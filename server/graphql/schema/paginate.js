const { gql } = require('apollo-server');

const typeDefs = gql`
    type Paginatable {
        page: Int!
        totalPages: Int!
        limit: Int!
    }
`;

module.exports = {
    typeDefs
};