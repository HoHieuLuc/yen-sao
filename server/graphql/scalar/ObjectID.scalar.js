const { gql, UserInputError } = require('apollo-server');
const { GraphQLScalarType, GraphQLError, Kind } = require('graphql');
const mongoose = require('mongoose');

const objectIDScalar = new GraphQLScalarType({
    name: 'ObjectID',
    description: 'ObjectID custom scalar type (ONLY USE FOR INPUT ARGUMENTS)',
    serialize(value) {
        if (!mongoose.Types.ObjectId.isValid(value)) {
            throw new UserInputError('ID không hợp lệ');
        }
        return value;
    },
    parseValue(value) {
        if (!mongoose.Types.ObjectId.isValid(value)) {
            throw new UserInputError('ID không hợp lệ');
        }
        return value;
    },
    parseLiteral(ast) {
        if (ast.kind !== Kind.STRING) {
            throw new GraphQLError(
                `Can only validate strings as object id but got a: ${ast.kind}`,
            );
        }
        if (!mongoose.Types.ObjectId.isValid(ast.value)) {
            throw new TypeError(
                `Value is not a valid object id of form: ${ast.value}`,
            );
        }
        return ast.value;
    },
});

const typeDefs = gql`
    scalar ObjectID
`;

const resolvers = {
    ObjectID: objectIDScalar
};

module.exports = {
    typeDefs,
    resolvers
};