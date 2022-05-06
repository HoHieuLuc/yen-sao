import { SanPham } from './san-pham';
import { User } from './user';

export interface ChiTietPhieuXuat {
    id: string;
    maPhieuXuat: string;
    sanPham: SanPham;
    soLuongXuat: number;
    donGiaXuat: number;
    createdAt: number;
    updatedAt: number;
}

export interface PhieuXuat {
    id: string;
    nguoiXuat: User;
    createdAt: number;
    updatedAt: number;
    soMatHangXuat: number;
    tongTien: number;
    chiTiet: Array<ChiTietPhieuXuat>
}

export interface PhieuXuatByID {
    phieuXuat: {
        byID: PhieuXuat;
    }
}

export interface ChiTietPhieuXuatFormData {
    maSanPham: string;
    soLuongXuat: number;
    donGiaXuat: number;
}

export interface PhieuXuatVars {
    payload: Array<ChiTietPhieuXuatFormData>
}