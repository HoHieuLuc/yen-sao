const { gql } = require('apollo-server');

const typeDefs = gql`
    type Token {
        value: String!
    }
`;

module.exports = {
    typeDefs
};