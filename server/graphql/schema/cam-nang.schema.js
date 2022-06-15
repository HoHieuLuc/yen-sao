const { authRequired, adminRequired } = require('../../middlewares/authentication');
const camNangController = require('../../controllers/cam-nang.controller');
const chainMiddlewares = require('../../middlewares');
const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type CamNang {
        id: ID!
        tieuDe: String!
        noiDung: String!
        isPublic: Boolean!
        slug: String!
        anhDaiDien: String!
        createdAt: Date!
        updatedAt: Date!
    }

    type CamNangsByPage {
        docs: [CamNang!]!
        pageInfo: PageInfo!
    }

    type CamNangQueries {
        all(
            page: Int!,
            limit: Int!,
            search: String
        ): CamNangsByPage
        byID(
            id: ObjectID!
        ): CamNang
        bySlug(
            slug: String!
        ): CamNang
    }

    extend type Query {
        camNang: CamNangQueries
    }

    input CreateCamNangInput {
        tieuDe: String!
        noiDung: String!
        isPublic: Boolean!
        anhDaiDien: String!
    }

    input UpdateCamNangInput {
        tieuDe: String
        noiDung: String
        isPublic: Boolean
        anhDaiDien: String
    }

    type CamNangMutations {
        create(
            payload: CreateCamNangInput!
        ): CamNang
        update(
            id: ObjectID!,
            payload: UpdateCamNangInput!
        ): CamNang
        delete(
            id: ObjectID!
        ): CamNang
    }
    
    extend type Mutation {
        camNang: CamNangMutations
    }
`;

const resolvers = {
    CamNangsByPage: {
        pageInfo: (root) => root
    },
    Query: {
        camNang: () => ({})
    },
    CamNangQueries: {
        all: (_, { page, limit, search }, { currentUser }) =>
            camNangController.getAll(page, limit, search, currentUser),
        byID: async (_, { id }) =>
            camNangController.getById(id),
        bySlug: async (_, { slug }) =>
            camNangController.getBySlug(slug)
    },
    Mutation: {
        camNang: chainMiddlewares(authRequired, () => ({}))
    },
    CamNangMutations: {
        create: (_, { payload }, { currentUser }) =>
            camNangController.create(payload, currentUser),
        update: (_, { id, payload }, { currentUser }) =>
            camNangController.update(id, payload, currentUser),
        delete: chainMiddlewares(adminRequired,
            (_, { id }, { currentUser }) =>
                camNangController.remove(id, currentUser)
        )
    }
};

module.exports = {
    typeDefs,
    resolvers
};