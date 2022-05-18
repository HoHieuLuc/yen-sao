import { gql, useApolloClient, useMutation, useQuery } from '@apollo/client';
import { showErrorNotification, showSuccessNotification } from '../../events';
import { AllPhieuXuats, AllPhieuXuatsVars, CreatePhieuXuatVars, PhieuXuatByID, UpdatePhieuXuatInput } from '../../types';

const ALL = gql`
    query AllPhieuXuats($page: Int!, $limit: Int!, $from: Date, $to: Date, $sort: SortPhieuXuat) {
        phieuXuat {
            all(page: $page, limit: $limit, from: $from, to: $to, sort: $sort) {
                docs {
                    id
                    nguoiXuat {
                        id
                        username
                        fullname
                    }
                    nguoiMua
                    ngayXuat
                    soMatHangXuat
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
    query PhieuXuatByID($id: ID!) {
        phieuXuat {
            byID(id: $id) {
                id
                nguoiXuat {
                    id
                    username
                    fullname
                }
                nguoiMua
                ngayXuat
                soMatHangXuat
                tongTien
                createdAt
                updatedAt
                chiTiet {
                    id
                    maPhieuXuat
                    sanPham {
                        id
                        tenSanPham
                        soLuong
                    }
                    soLuongXuat
                    donGiaXuat
                    thanhTien
                    ghiChu
                }
            }
        }
    }
`;

const CREATE = gql`
    mutation CreatePhieuXuat($nguoiMua: String!, $ngayXuat: Date!, $payload: [ChiTietPhieuXuatInput!]!) {
        phieuXuat {
            create(nguoiMua: $nguoiMua, ngayXuat: $ngayXuat, payload: $payload) {
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
    mutation DeletePhieuXuat($id: ID!) {
        phieuXuat {
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
    mutation UpdatePhieuXuat($id: ID!, $payload: UpdatePhieuXuatInput!) {
        phieuXuat {
            update(id: $id, payload: $payload) {
                id
                nguoiMua
                ngayXuat
                updatedAt
            }
        }
    }
`;

const useAllPhieuXuats = (variables: AllPhieuXuatsVars) => {
    return useQuery<
        AllPhieuXuats, AllPhieuXuatsVars
    >(ALL, {
        variables,
        fetchPolicy: 'cache-and-network'
    });
};

const usePhieuXuatById = (id: string) => {
    return useQuery<
        PhieuXuatByID, { id: string }
    >(BY_ID, {
        variables: {
            id: id || ''
        }
    });
};

const useCreatePhieuXuat = () => {
    const client = useApolloClient();
    return useMutation<
        never, CreatePhieuXuatVars
    >(CREATE, {
        onCompleted: () => {
            showSuccessNotification('Tạo phiếu xuất thành công');
            client.cache.evict({
                id: 'ROOT_QUERY',
                fieldName: 'phieuXuat',
            });
            client.cache.gc();
        },
        onError: (error) => showErrorNotification(error.message)
    });
};

const useUpdatePhieuXuat = () => {
    return useMutation<
        never, UpdatePhieuXuatInput
    >(UPDATE, {
        onCompleted: () => showSuccessNotification('Cập nhật phiếu xuất thành công'),
        onError: (error) => showErrorNotification(error.message)
    });
};

const useDeletePhieuXuat = () => {
    const client = useApolloClient();
    return useMutation<
        never, { id: string }
    >(DELETE, {
        onCompleted: () => {
            showSuccessNotification(
                `Xóa phiếu xuất thành công`
            );
            client.cache.evict({
                id: 'ROOT_QUERY',
                fieldName: 'phieuXuat',
            });
            client.cache.gc();
        },
        onError: (error) => {
            showErrorNotification(error.message);
        }
    });
};

export const phieuXuatHooks = {
    useAllPhieuXuats,
    usePhieuXuatById,
    useCreatePhieuXuat,
    useUpdatePhieuXuat,
    useDeletePhieuXuat,
};