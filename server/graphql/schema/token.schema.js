const { gql } = require('apollo-server');
const PhieuNhap = require('../../models/PhieuNhap');

const typeDefs = gql`
    type Token {
        value: String!
    }

    type ThongKe {
        value: Object
    }

    extend type Query {
        "experimental"
        thongKe: ThongKe
    }
`;

const resolvers = {
    Query: {
        thongKe: async () => {
            const value = await PhieuNhap.aggregate([
                {
                    $group: {
                        _id: {
                            month: { $month: '$ngayNhap' },
                            year: { $year: '$ngayNhap' },
                        },
                        total: { $sum: '$tongTien' },
                        ngayNhap: { $first: '$ngayNhap' },
                    }
                }
            ]);
            return { value };
        }
    }
};

module.exports = {
    typeDefs,
    resolvers
};