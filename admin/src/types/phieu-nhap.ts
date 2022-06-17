import { PageInfo, PaginateVars } from './paginate';
import { SanPham } from './san-pham';
import { User } from './user';

export interface ChiTietPhieuNhap {
    id: string;
    maPhieuNhap: string;
    ngayNhap: number;
    sanPham: SanPham;
    soLuongNhap: number;
    donGiaNhap: number;
    thanhTien: number;
    ghiChu: string;
    createdAt: number;
    updatedAt: number;
}

export interface PhieuNhap {
    id: string;
    nguoiNhap: User;
    ngayNhap: number;
    soMatHangNhap: number;
    tongTien: number;
    chiTiet: Array<ChiTietPhieuNhap>;
    createdAt: number;
    updatedAt: number;
}

export interface AllPhieuNhaps {
    phieuNhap: {
        all: {
            docs: Array<PhieuNhap>;
            pageInfo: PageInfo;
        }
    }
}

export interface AllPhieuNhapsVars extends PaginateVars {
    from: number | null;
    to: number | null;
    sort?: string | null;
}

export interface PhieuNhapByID {
    phieuNhap: {
        byID?: PhieuNhap;
    }
}

export interface ChiTietPhieuNhapInput {
    maSanPham: string;
    soLuongNhap: number;
    donGiaNhap: number;
    ghiChu: string;
}

export interface UpdatePhieuNhapVars {
    id: string;
    payload: {
        ngayNhap: Date
    };
}

export interface CreatePhieuNhapVars {
    ngayNhap: Date;
    payload: Array<ChiTietPhieuNhapInput>;
}

export interface ChiTietPhieuNhapsBySanPhamID {
    chiTietPhieuNhap: {
        bySanPhamID: {
            docs: Array<Omit<ChiTietPhieuNhap, 'sanPham'>>;
            pageInfo: PageInfo;
        }
    }
}

export interface ChiTietPhieuNhapsBySanPhamIDVars extends PaginateVars {
    id: string;
    from: number | null;
    to: number | null;
    sort: string | null;
}

export interface CreateChiTietPhieuNhapVars {
    idPhieuNhap: string;
    payload: ChiTietPhieuNhapInput
}

export interface UpdateChiTietPhieuNhapVars {
    idPhieuNhap: string;
    idChiTiet: string;
    payload: ChiTietPhieuNhapInput;
}

export interface AllChiTietPhieuNhaps {
    chiTietPhieuNhap: {
        all: Array<ChiTietPhieuNhap>;
    }
}

export interface AllChiTietPhieuNhapsVars {
    from: Date;
    to: Date;
}