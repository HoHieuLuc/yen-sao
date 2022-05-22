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
    createdAt: number;
    updatedAt: number;
}

export interface SanPhamFormVars {
    tenSanPham: string;
    donGiaSi: number;
    donGiaLe: number;
    donGiaTuyChon: string;
    moTa: string;
    xuatXu: string;
    tags: Array<string>;
    anhSanPham: Array<string>;
    isPublic: boolean;
}

export interface UpdateSanPhamInput {
    id: string;
    payload: SanPhamFormVars;
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

export interface SearchSanPhamVars extends PaginateVars {
    search: string;
    sort?: string | null;
}