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

export interface PhieuNhapByID {
    phieuNhap: {
        byID: PhieuNhap;
    }
}

export interface ChiTietPhieuNhapInput {
    maSanPham: string;
    soLuongNhap: number;
    donGiaNhap: number;
    ghiChu: string;
}

export interface UpdatePhieuNhapInput {
    id: string;
    payload: {
        ngayNhap: Date
    };
}

export interface PhieuNhapVars {
    ngayNhap: Date;
    payload: Array<ChiTietPhieuNhapInput>;
}