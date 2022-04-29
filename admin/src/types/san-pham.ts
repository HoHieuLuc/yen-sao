import { LoaiSanPham } from './loai-san-pham';

export interface SanPham {
    id: string;
    tenSanPham: string;
    soLuong: number;
    donGia: number;
    moTa: string;
    anhSanPham: Array<string>;
    createdAt: number;
    updatedAt: number;
    loaiSanPham: LoaiSanPham;
}