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

export interface PhieuXuatByID {
    phieuXuat: {
        byID: PhieuXuat;
    }
}

export interface ChiTietPhieuXuatInput {
    maSanPham: string;
    soLuongXuat: number;
    donGiaXuat: number;
    ghiChu: string;
}

export interface UpdatePhieuXuatInput {
    id: string;
    payload: {
        ngayXuat: Date;
        nguoiMua: string;
    }
}

export interface PhieuXuatVars {
    nguoiMua: string;
    ngayXuat: Date;
    payload: Array<ChiTietPhieuXuatInput>
}