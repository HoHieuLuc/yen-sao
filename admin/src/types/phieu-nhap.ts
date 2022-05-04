import { SanPham } from './san-pham';
import { User } from './user';

export interface ChiTietPhieuNhap {
    id: string;
    maPhieuNhap: string;
    sanPham: SanPham;
    soLuongNhap: number;
    donGiaNhap: number;
}

export interface PhieuNhap {
    id: string;
    nguoiNhap: User;
    createdAt: number;
    updatedAt: number;
    soMatHangNhap: number;
    tongTien: number;
    chiTiet: Array<ChiTietPhieuNhap>
}

export interface PhieuNhapByID {
    phieuNhap: {
        byID: PhieuNhap;
    }
}

export interface ChiTietPhieuNhapFormData {
    maSanPham: string;
    soLuongNhap: number;
    donGiaNhap: number;
}

export interface PhieuNhapVars {
    payload: Array<ChiTietPhieuNhapFormData>
}