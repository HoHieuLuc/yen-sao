const { gql } = require('apollo-server');
const chainMiddlewares = require('../../middlewares');
const { adminRequired } = require('../../middlewares/authentication');
const PhieuNhap = require('../../models/PhieuNhap');

const typeDefs = gql`
    type ThongKe {
        nhap: Object
    }

    type ThongKeQueries {
        byDateRange(
            from: Date!,
            to: Date!
        ): ThongKe
    }

    extend type Query {
        "experimental"
        thongKe: ThongKeQueries
    }
`;

const resolvers = {
    Query: {
        thongKe: chainMiddlewares(adminRequired, () => ({}))
    },
    ThongKeQueries: {
        byDateRange: async (_, { from, to }) => {
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const nhap = await PhieuNhap.aggregate([
                {
                    $match: {
                        ngayNhap: {
                            $gte: from,
                            $lte: to,
                        }
                    }
                },
                {
                    $group: {
                        _id: {
                            month: {
                                $month: {
                                    date: '$ngayNhap', timezone
                                }
                            },
                            year: {
                                $year: {
                                    date: '$ngayNhap', timezone
                                }
                            },
                        },
                        total: { $sum: '$tongTien' },
                    }
                }
            ]);
            return { nhap };
        }
    }
};

module.exports = {
    typeDefs,
    resolvers
};