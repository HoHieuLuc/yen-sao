import { PageInfo, PaginateVars } from './paginate';

export interface CamNang {
    id: string;
    tieuDe: string;
    noiDung: string;
    isPublic: boolean;
    slug: string;
    anhDaiDien: string;
    createdAt: number;
    updatedAt: number;
}

export interface AllCamNangs {
    camNang: {
        all: {
            docs: Array<CamNang>;
            pageInfo: PageInfo;
        }
    }
}

export interface AllCamNangsVars extends PaginateVars {
    search: string;
}

export interface CamNangByID {
    camNang: {
        byID: CamNang;
    }
}

export interface CamNangFormData {
    tieuDe: string;
    noiDung: string;
    isPublic: boolean;
    anhDaiDien: string;
}

export interface CreateCamNangVars {
    payload: CamNangFormData
}

export interface UpdateCamNangVars extends CreateCamNangVars {
    id: string;
}