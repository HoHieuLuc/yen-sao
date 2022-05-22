const { GraphQLScalarType, Kind } = require('graphql');
const deepMapKeys = require('deep-map-keys');
const { gql } = require('apollo-server');

const tranformObjectKey = (key) => {
    if (key === '_id') {
        return 'id';
    }
    if (key === 'maSanPham') {
        return 'sanPham';
    }
    return key;
};

const objectScalar = new GraphQLScalarType({
    name: 'Object',
    description: 'Arbitrary object',
    serialize: (value) => {
        return typeof value === 'object'
            ? value
            : typeof value === 'string'
                ? deepMapKeys(JSON.parse(value), tranformObjectKey)
                : null;
    },
    parseValue: (value) => {
        return typeof value === 'object' ? value
            : typeof value === 'string' ? JSON.parse(value)
                : null;
    },
    parseLiteral: (ast) => {
        switch (ast.kind) {
            case Kind.STRING:
                return JSON.parse(ast.value);
            case Kind.OBJECT:
                throw new Error(`Not sure what to do with OBJECT for ObjectScalarType`);
            default:
                return null;
        }
    }
});

const typeDefs = gql`
    scalar Object
`;

const resolvers = {
    Object: objectScalar
};

module.exports = {
    typeDefs,
    resolvers
};