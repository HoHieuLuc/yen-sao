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