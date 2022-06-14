import { PageInfo, PaginateVars } from './paginate';

export interface SanPham {
    id: string;
    tenSanPham: string;
    soLuong: number;
    donGiaSi: number;
    donGiaLe: number;
    donGiaTuyChon: string;
    moTa: string;
    xuatXu: string;
    tags: Array<string>;
    anhSanPham: Array<string>;
    isPublic: boolean;
    isFeatured: boolean;
    createdAt: number;
    updatedAt: number;
}

export interface SanPhamFormData {
    tenSanPham: string;
    donGiaSi: number;
    donGiaLe: number;
    donGiaTuyChon: string;
    moTa: string;
    xuatXu: string;
    tags: Array<string>;
    anhSanPham: Array<string>;
    isPublic: boolean;
    isFeatured: boolean;
}

export interface CreateSanPhamVars {
    payload: SanPhamFormData;
}

export interface UpdateSanPhamVars {
    id: string;
    payload: SanPhamFormData;
}

export interface SanPhamByID {
    sanPham: {
        byID: SanPham
    }
}

export interface AllSanPhams {
    sanPham: {
        all: {
            docs: Array<SanPham>;
            pageInfo: PageInfo;
        }
    }
}

export interface AllSanPhamVars extends PaginateVars {
    search: string;
    sort?: string | null;
}