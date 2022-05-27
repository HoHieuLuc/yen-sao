import { gql, useApolloClient, useMutation, useQuery } from '@apollo/client';
import { showErrorNotification, showSuccessNotification } from '../../events';
import {
    AllPhieuNhaps,
    PhieuNhapByID,
    AllPhieuNhapsVars,
    CreatePhieuNhapVars,
    UpdatePhieuNhapInput,
} from '../../types';

const ALL = gql`
    query AllPhieuNhaps($page: Int!, $limit: Int!, $from: Date, $to: Date, $sort: SortPhieuNhap) {
        phieuNhap {
            all(page: $page, limit: $limit, from: $from, to: $to, sort: $sort) {
                docs {
                    id
                    nguoiNhap {
                        id
                        username
                        fullname
                    }
                    ngayNhap
                    soMatHangNhap
                    tongTien
                    createdAt
                }
                pageInfo {
                    page
                    totalPages
                    limit
                }
            }
        }
    }
`;

const BY_ID = gql`
    query PhieuNhapByID($id: ObjectID!) {
        phieuNhap {
            byID(id: $id) {
                id
                nguoiNhap {
                    id
                    username
                    fullname
                }
                ngayNhap
                soMatHangNhap
                tongTien
                createdAt
                updatedAt
                chiTiet {
                    id
                    maPhieuNhap
                    sanPham {
                        id
                        tenSanPham
                        soLuong
                    }
                    soLuongNhap
                    donGiaNhap
                    thanhTien
                    ghiChu
                }
            }
        }
    }
`;

const CREATE = gql`
    mutation CreatePhieuNhap($ngayNhap: Date!, $payload: [ChiTietPhieuNhapInput!]!) {
        phieuNhap {
            create(ngayNhap: $ngayNhap, payload: $payload) {
                id
                chiTiet {
                    id
                    sanPham {
                        id
                        soLuong
                    }
                }
            }
        }
    }
`;

const DELETE = gql`
    mutation DeletePhieuNhap($id: ObjectID!) {
        phieuNhap {
            delete(id: $id) {
                id
                chiTiet {
                    id
                    sanPham {
                        id
                        soLuong
                    }
                }
            }
        }
    }
`;

const UPDATE = gql`
    mutation UpdatePhieuNhap($id: ObjectID!, $payload: UpdatePhieuNhapInput!) {
        phieuNhap {
            update(id: $id, payload: $payload) {
                id
                ngayNhap
                updatedAt
            }
        }
    }
`;

const useAllPhieuNhaps = (variables: AllPhieuNhapsVars) => {
    return useQuery<
        AllPhieuNhaps, AllPhieuNhapsVars
    >(ALL, {
        variables,
        fetchPolicy: 'cache-and-network'
    });
};

const usePhieuNhapByID = (id: string) => {
    return useQuery<
        PhieuNhapByID, { id: string }
    >(BY_ID, {
        variables: {
            id
        }
    });
};

const useCreatePhieuNhap = () => {
    return useMutation<
        never, CreatePhieuNhapVars
    >(CREATE, {
        onCompleted: () => showSuccessNotification('Tạo phiếu nhập thành công'),
        onError: (error) => showErrorNotification(error.message)
    });
};

const useUpdatePhieuNhap = () => {
    return useMutation<
        never, UpdatePhieuNhapInput
    >(UPDATE, {
        onCompleted: () => showSuccessNotification('Cập nhật phiếu nhập thành công'),
        onError: (error) => showErrorNotification(error.message)
    });

};

const useDeletePhieuNhap = () => {
    const client = useApolloClient();
    return useMutation<
        never, { id: string }
    >(DELETE, {
        onCompleted: () => {
            showSuccessNotification(
                `Xóa phiếu nhập thành công`
            );
            client.cache.evict({
                id: 'ROOT_QUERY',
                fieldName: 'phieuNhap',
            });
            client.cache.gc();
        },
        onError: (error) => {
            showErrorNotification(error.message);
        }
    });
};

export const phieuNhapHooks = {
    useAllPhieuNhaps,
    usePhieuNhapByID,
    useCreatePhieuNhap,
    useUpdatePhieuNhap,
    useDeletePhieuNhap,
};