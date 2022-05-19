import { PageInfo, PaginateVars } from './paginate';
import { PhieuNhap } from './phieu-nhap';
import { PhieuXuat } from './phieu-xuat';
import { SanPham } from './san-pham';
import { User } from './user';

interface BaseActivity {
    id: string;
    userId: User;
    action: 'create' | 'update' | 'delete';
    onCollection: string;
    onDocumentId: string;
    createdAt: number;
}

export interface Activity extends BaseActivity {
    description: {
        name: string;
    };
}

export interface AllActivities {
    activityLog: {
        all: {
            docs: Array<Activity>;
            pageInfo: PageInfo;
        }
    }
}

export type AllActivitiesVars = PaginateVars;

export interface ActivitiesByUserId {
    activityLog: {
        byUserID: {
            docs: Array<Activity>;
            pageInfo: PageInfo;
        }
    }
}

export interface ActivitiesByUserIdVars extends AllActivitiesVars {
    userId: string;
}

export interface SanPhamActivity extends BaseActivity {
    onCollection: 'SanPham';
    description: {
        name: string;
        value: SanPham;
    };
}

export interface PhieuNhapActivity extends BaseActivity {
    onCollection: 'PhieuNhap';
    description: {
        name: string;
        value: PhieuNhap;
    }
}

export interface PhieuXuatActivity extends BaseActivity {
    onCollection: 'PhieuXuat';
    description: {
        name: string;
        value: PhieuXuat;
    }
}

export interface ActivityById {
    activityLog: {
        byID: SanPhamActivity | PhieuNhapActivity | PhieuXuatActivity;
    }
}