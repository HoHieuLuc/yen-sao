import { PageInfo, PaginateVars } from './paginate';
import { SanPham } from './san-pham';
import { User } from './user';

export interface ChiTietPhieuXuat {
    id: string;
    maPhieuXuat: string;
    ngayXuat: number;
    sanPham: SanPham;
    soLuongXuat: number;
    donGiaXuat: number;
    thanhTien: number;
    ghiChu: string;
    isCompleted: boolean;
    createdAt: number;
    updatedAt: number;
}

export interface PhieuXuat {
    id: string;
    nguoiXuat: User;
    nguoiMua: string;
    ngayXuat: number;
    soMatHangXuat: number;
    tongTien: number;
    chiTiet: Array<ChiTietPhieuXuat>
    createdAt: number;
    updatedAt: number;
}

export interface AllPhieuXuats {
    phieuXuat: {
        all: {
            docs: Array<PhieuXuat>;
            pageInfo: PageInfo;
        }
    }
}

export interface AllPhieuXuatsVars extends PaginateVars {
    from: number | null;
    to: number | null;
    sort?: string | null;
}

export interface PhieuXuatByID {
    phieuXuat: {
        byID?: PhieuXuat;
    }
}

export interface ChiTietPhieuXuatInput {
    maSanPham: string;
    soLuongXuat: number;
    donGiaXuat: number;
    ghiChu: string;
    isCompleted: boolean;
}

export interface UpdatePhieuXuatVars {
    id: string;
    payload: {
        ngayXuat: Date;
        nguoiMua: string;
    }
}

export interface CreatePhieuXuatVars {
    nguoiMua: string;
    ngayXuat: Date;
    payload: Array<ChiTietPhieuXuatInput>
}

export interface ChiTietPhieuXuatsBySanPhamID {
    chiTietPhieuXuat: {
        bySanPhamID: {
            docs: Array<Omit<ChiTietPhieuXuat, 'sanPham'>>;
            pageInfo: PageInfo;
        }
    }
}

export interface ChiTietPhieuXuatsBySanPhamIDVars extends PaginateVars {
    id: string;
    from: number | null;
    to: number | null;
    sort: string | null;
}

export interface CreateChiTietPhieuXuatVars {
    idPhieuXuat: string;
    payload: ChiTietPhieuXuatInput
}

export interface UpdateChiTietPhieuXuatVars {
    idPhieuXuat: string;
    idChiTiet: string;
    payload: ChiTietPhieuXuatInput;
}

export interface AllChiTietPhieuXuats {
    chiTietPhieuXuat: {
        all: Array<ChiTietPhieuXuat>;
    }
}

export interface AllChiTietPhieuXuatsVars {
    from: Date;
    to: Date;
}