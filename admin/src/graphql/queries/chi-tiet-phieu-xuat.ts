import { gql, useApolloClient, useMutation, useQuery } from '@apollo/client';
import { showErrorNotification, showSuccessNotification } from '../../events';
import {
    UpdateChiTietPhieuXuatVars, ChiTietPhieuXuatsBySanPhamID, ChiTietPhieuXuatsBySanPhamIDVars,
    AllChiTietPhieuXuats, AllChiTietPhieuXuatsVars, CreateChiTietPhieuXuatVars
} from '../../types';

const ALL = gql`
    query AllChiTietPhieuXuats($from: Date!, $to: Date!) {
        chiTietPhieuXuat {
            all(from: $from, to: $to) {
                id
                maPhieuXuat
                sanPham {
                    id
                    tenSanPham
                }
                soLuongXuat
                donGiaXuat
                thanhTien
                ngayXuat
                isCompleted
            }
        }
    }
`;

const BY_SAN_PHAM_ID = gql`
    query ChiTietPhieuXuatsBySanPhamID(
        $id: ObjectID!, 
        $page: Int!, 
        $limit: Int!,
        $from: Date,
        $to: Date,
        $sort: SortChiTietPhieuXuat
    ) {
        chiTietPhieuXuat {
            bySanPhamID(id: $id, page: $page, limit: $limit, from: $from, to: $to, sort: $sort) {
                docs {
                    id
                    maPhieuXuat
                    soLuongXuat
                    donGiaXuat
                    ngayXuat
                    thanhTien
                    isCompleted
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
    mutation CreateChiTietPhieuXuat($idPhieuXuat: ObjectID!, $payload: ChiTietPhieuXuatInput!) {
        chiTietPhieuXuat {
            create(idPhieuXuat: $idPhieuXuat, payload: $payload) {
                id
                soMatHangXuat
                tongTien
                chiTiet {
                    id
                    sanPham {
                        id
                        soLuong
                    }
                    soLuongXuat
                    donGiaXuat
                    thanhTien
                    ngayXuat
                    ghiChu
                    isCompleted
                }
            }
        }
    }
`;

const UPDATE = gql`
    mutation UpdateChiTietPhieuXuat(
        $idPhieuXuat: ObjectID!,
        $idChiTiet: ObjectID!, 
        $payload: ChiTietPhieuXuatInput!) 
    {
        chiTietPhieuXuat {
            update(idPhieuXuat: $idPhieuXuat, idChiTiet: $idChiTiet, payload: $payload) {
                phieuXuat {
                    id
                    soMatHangXuat
                    tongTien
                    chiTiet {
                        id
                        sanPham {
                            id
                            soLuong
                        }
                        soLuongXuat
                        donGiaXuat
                        thanhTien
                        ngayXuat
                        ghiChu
                        isCompleted
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
    mutation DeleteChiTietPhieuXuat($idPhieuXuat: ObjectID!, $idChiTiet: ObjectID!) {
        chiTietPhieuXuat {
            delete(idPhieuXuat: $idPhieuXuat, idChiTiet: $idChiTiet) {
                phieuXuat {
                    id
                    soMatHangXuat
                    tongTien
                    chiTiet {
                        id
                        sanPham {
                            id
                            soLuong
                        }
                        soLuongXuat
                        donGiaXuat
                        thanhTien
                        ngayXuat
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

const useAllChiTietPhieuXuats = (variables: AllChiTietPhieuXuatsVars) => {
    return useQuery<
        AllChiTietPhieuXuats, AllChiTietPhieuXuatsVars
    >(ALL, {
        variables,
        fetchPolicy: 'cache-and-network'
    });
};

const useChiTietPhieuXuatsBySanPhamID = (variables: ChiTietPhieuXuatsBySanPhamIDVars) => {
    return useQuery<
        ChiTietPhieuXuatsBySanPhamID, ChiTietPhieuXuatsBySanPhamIDVars
    >(BY_SAN_PHAM_ID, {
        variables,
        fetchPolicy: 'cache-and-network'
    });
};

const useCreateChiTietPhieuXuat = () => {
    return useMutation<
        never, CreateChiTietPhieuXuatVars
    >(CREATE, {
        onError: (error) => showErrorNotification(error.message),
        onCompleted: () => showSuccessNotification('Thêm sản phẩm vào phiếu xuất thành công')
    });
};

const useUpdateChiTietPhieuXuat = () => {
    return useMutation<
        never, UpdateChiTietPhieuXuatVars
    >(UPDATE, {
        onCompleted: () => showSuccessNotification('Cập nhật thành công'),
        onError: (error) => showErrorNotification(error.message),
    });
};

const useDeleteChiTietPhieuXuat = (tenSanPham: string, idChiTiet: string) => {
    const client = useApolloClient();
    return useMutation<
        never, { idPhieuXuat: string, idChiTiet: string }
    >(DELETE, {
        onCompleted: () => {
            showSuccessNotification(`Xóa sản phẩm "${tenSanPham}" khỏi phiếu xuất thành công`);
            client.cache.evict({ id: `ChiTietPhieuXuat:${idChiTiet}` });
            client.cache.gc();
        },
        onError: (error) => showErrorNotification(error.message)
    });
};


export const chiTietPhieuXuatHooks = {
    useChiTietPhieuXuatsBySanPhamID,
    useCreateChiTietPhieuXuat,
    useUpdateChiTietPhieuXuat,
    useDeleteChiTietPhieuXuat,
    useAllChiTietPhieuXuats
};