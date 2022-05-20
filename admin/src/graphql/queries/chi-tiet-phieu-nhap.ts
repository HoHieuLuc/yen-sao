import { gql, useApolloClient, useMutation, useQuery } from '@apollo/client';
import { showErrorNotification, showSuccessNotification } from '../../events';
import {
    AllChiTietPhieuNhaps,
    AllChiTietPhieuNhapsVars,
    ChiTietPhieuNhapBySanPhamID,
    ChiTietPhieuNhapBySanPhamIDVars,
    CreateChiTietPhieuNhapVars,
    UpdateChiTietPhieuNhapVars
} from '../../types';

const ALL = gql`
    query AllChiTietPhieuNhaps($from: Date!, $to: Date!) {
        chiTietPhieuNhap {
            all(from: $from, to: $to) {
                id
                maPhieuNhap
                sanPham {
                    id
                    tenSanPham
                }
                soLuongNhap
                donGiaNhap
                thanhTien
                ngayNhap
            }
        }
    }
`;

const BY_SAN_PHAM_ID = gql`
    query ChiTietPhieuNhapBySanPhamID(
        $id: ID!, 
        $page: Int!, 
        $limit: Int!, 
        $from: Date, 
        $to: Date,
        $sort: SortChiTietPhieuNhap
    ) {
        chiTietPhieuNhap {
            bySanPhamID(id: $id, page: $page, limit: $limit, from: $from, to: $to, sort: $sort) {
                docs {
                    id
                    maPhieuNhap
                    soLuongNhap
                    donGiaNhap
                    ngayNhap
                    thanhTien
                }
                pageInfo {
                    page
                    totalPages
                    limit
                    totalDocs
                }
            }
        }
    }
`;

const CREATE = gql`
    mutation CreateChiTietPhieuNhap($idPhieuNhap: ID!, $payload: ChiTietPhieuNhapInput!) {
        chiTietPhieuNhap {
            create(idPhieuNhap: $idPhieuNhap, payload: $payload) {
                id
                soMatHangNhap
                tongTien
                chiTiet {
                    id
                    sanPham {
                        id
                        soLuong
                    }
                    soLuongNhap
                    donGiaNhap
                    thanhTien
                    ngayNhap
                    ghiChu
                }
            }
        }
    }
`;

const UPDATE = gql`
    mutation UpdateChiTietPhieuNhap(
        $idPhieuNhap: ID!,
        $idChiTiet: ID!, 
        $payload: ChiTietPhieuNhapInput!) 
    {
        chiTietPhieuNhap {
            update(idPhieuNhap: $idPhieuNhap, idChiTiet: $idChiTiet, payload: $payload) {
                phieuNhap {
                    id
                    soMatHangNhap
                    tongTien
                    chiTiet {
                        id
                        sanPham {
                            id
                            soLuong
                        }
                        soLuongNhap
                        donGiaNhap
                        thanhTien
                        ngayNhap
                        ghiChu
                    }
                }
                sanPhamBiThayDoi {
                    id
                    tenSanPham
                    soLuong
                }
            }
        }
    }
`;

const DELETE = gql`
    mutation DeleteChiTietPhieuNhap($idPhieuNhap: ID!, $idChiTiet: ID!) {
        chiTietPhieuNhap {
            delete(idPhieuNhap: $idPhieuNhap, idChiTiet: $idChiTiet) {
                phieuNhap {
                    id
                    soMatHangNhap
                    tongTien
                    chiTiet {
                        id
                        sanPham {
                            id
                            soLuong
                        }
                        soLuongNhap
                        donGiaNhap
                        thanhTien
                        ngayNhap
                        ghiChu
                    }
                }
                sanPhamBiThayDoi {
                    id
                    tenSanPham
                    soLuong          
                }
            }
        }
    }
`;

const useAllChiTietPhieuNhaps = (variables: AllChiTietPhieuNhapsVars) => {
    return useQuery<
        AllChiTietPhieuNhaps, AllChiTietPhieuNhapsVars
    >(ALL, {
        variables,
        fetchPolicy: 'cache-and-network'
    });
};

const useChiTietPhieuNhapBySanPhamId = (variables: ChiTietPhieuNhapBySanPhamIDVars) => {
    return useQuery<
        ChiTietPhieuNhapBySanPhamID, ChiTietPhieuNhapBySanPhamIDVars
    >(BY_SAN_PHAM_ID, {
        variables,
        fetchPolicy: 'cache-and-network',
    });
};

const useCreateChiTietPhieuNhap = () => {
    return useMutation<
        never, CreateChiTietPhieuNhapVars
    >(CREATE, {
        onCompleted: () => showSuccessNotification('Thêm sản phẩm vào phiếu nhập thành công'),
        onError: (error) => showErrorNotification(error.message),
    });
};

const useUpdateChiTietPhieuNhap = () => {
    return useMutation<
        never, UpdateChiTietPhieuNhapVars
    >(UPDATE, {
        onCompleted: () => showSuccessNotification('Cập nhật thành công'),
        onError: (error) => showErrorNotification(error.message),
    });
};

const useDeleteChiTietPhieuNhap = (tenSanPham: string, idChiTiet: string) => {
    const client = useApolloClient();
    return useMutation<
        never, { idPhieuNhap: string, idChiTiet: string }
    >(DELETE, {
        onCompleted: () => {
            showSuccessNotification(`Xóa sản phẩm "${tenSanPham}" khỏi phiếu nhập thành công`);
            client.cache.evict({ id: `ChiTietPhieuNhap:${idChiTiet}` });
            client.cache.gc();
        },
        onError: (error) => showErrorNotification(error.message)
    });
};

export const chiTietPhieuNhapHooks = {
    useChiTietPhieuNhapBySanPhamId,
    useCreateChiTietPhieuNhap,
    useUpdateChiTietPhieuNhap,
    useDeleteChiTietPhieuNhap,
    useAllChiTietPhieuNhaps,
};