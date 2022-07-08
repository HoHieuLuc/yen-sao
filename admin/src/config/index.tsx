import HomePage from '../pages';

import EditSanPhamPage from '../pages/san-pham/[id]/sua';
import SanPhamDetailsPage from '../pages/san-pham/[id]';
import CreateSanPhamPage from '../pages/san-pham/them';
import SanPhamPage from '../pages/san-pham';

import EditPhieuNhapPage from '../pages/phieu-nhap/[id]/sua';
import PhieuNhapDetailsPage from '../pages/phieu-nhap/[id]';
import CreatePhieuNhapPage from '../pages/phieu-nhap/them';
import PhieuNhapPage from '../pages/phieu-nhap';

import EditPhieuXuatPage from '../pages/phieu-xuat/[id]/sua';
import PhieuXuatDetailsPage from '../pages/phieu-xuat/[id]';
import CreatePhieuXuatPage from '../pages/phieu-xuat/them';
import PhieuXuatPage from '../pages/phieu-xuat';

import EditCamNangPage from '../pages/cam-nang/[id]/sua';
import CamNangDetailsPage from '../pages/cam-nang/[id]';
import CreateCamNangPage from '../pages/cam-nang/them';
import CamNangPage from '../pages/cam-nang';

import ManageUserDetailsPage from '../pages/quan-ly/users/[id]';
import ManageWebsiteInfoPage from '../pages/quan-ly/thong-tin';
import ManageActivitiesPage from '../pages/quan-ly/hoat-dong';
import ManageUsersPage from '../pages/quan-ly/users';

import AccountPage from '../pages/my-account';

import ActivityDetailsPage from '../pages/hoat-dong/[id]';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBook, faBox, faCircleInfo, faHistory, faHouse, faHouseLock, faList,
    faPlus, faTruckMedical, faTruckRampBox, faUser, faUserGear
} from '@fortawesome/free-solid-svg-icons';

import { AppConfig } from './types';

const title = 'Yến Sào Ms. Tưởng';

const appConfig: AppConfig = {
    title: title,
    apiURL: process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : '',
    links: [
        {
            type: 'nav',
            title: 'Trang chủ',
            to: '/',
            element: <HomePage title={title} />,
            icon: <FontAwesomeIcon icon={faHouse} />
        },
        {
            type: 'menu',
            title: 'Sản phẩm',
            subLinksPattern: '/san-pham',
            icon: <FontAwesomeIcon icon={faBox} />,
            subLinks: [
                {
                    title: 'Danh sách',
                    type: 'nav',
                    to: '/san-pham',
                    element: <SanPhamPage title={`Danh sách sản phẩm - ${title}`} />,
                    icon: <FontAwesomeIcon icon={faList} />
                },
                {
                    title: 'Thêm mới',
                    type: 'nav',
                    to: '/san-pham/them',
                    roles: ['admin'],
                    element: <CreateSanPhamPage title={`Thêm sản phẩm - ${title}`} />,
                    icon: <FontAwesomeIcon icon={faPlus} />
                },
                {
                    title: 'Sửa',
                    type: 'hidden',
                    to: '/san-pham/:id/sua',
                    roles: ['admin'],
                    element: <EditSanPhamPage title={title} />
                },
                {
                    title: 'Chi tiết',
                    type: 'hidden',
                    to: '/san-pham/:id',
                    element: <SanPhamDetailsPage title={title} />
                }
            ]
        },
        {
            type: 'menu',
            title: 'Nhập hàng',
            subLinksPattern: '/phieu-nhap',
            icon: <FontAwesomeIcon icon={faTruckMedical} />,
            subLinks: [
                {
                    type: 'nav',
                    title: 'Danh sách',
                    to: '/phieu-nhap',
                    element: <PhieuNhapPage title={`Danh sách phiếu nhập - ${title}`} />,
                    icon: <FontAwesomeIcon icon={faList} />
                },
                {
                    type: 'nav',
                    title: 'Tạo phiếu nhập',
                    to: '/phieu-nhap/them',
                    element: <CreatePhieuNhapPage title={`Tạo phiếu nhập - ${title}`} />,
                    icon: <FontAwesomeIcon icon={faPlus} />
                },
                {
                    type: 'hidden',
                    title: 'Chi tiết phiếu nhập',
                    to: '/phieu-nhap/:id',
                    element: <PhieuNhapDetailsPage title={title} />
                },
                {
                    type: 'hidden',
                    title: 'Chỉnh sửa phiếu nhập',
                    to: '/phieu-nhap/:id/sua',
                    element: <EditPhieuNhapPage title={title} />
                }
            ]
        },
        {
            type: 'menu',
            title: 'Xuất hàng',
            subLinksPattern: '/phieu-xuat',
            icon: <FontAwesomeIcon icon={faTruckRampBox} />,
            subLinks: [
                {
                    type: 'nav',
                    title: 'Danh sách',
                    to: '/phieu-xuat',
                    element: <PhieuXuatPage title={`Danh sách phiếu xuất - ${title}`} />,
                    icon: <FontAwesomeIcon icon={faList} />
                },
                {
                    type: 'nav',
                    title: 'Tạo phiếu xuất',
                    to: '/phieu-xuat/them',
                    element: <CreatePhieuXuatPage title={`Tạo phiếu xuất - ${title}`} />,
                    icon: <FontAwesomeIcon icon={faPlus} />
                },
                {
                    type: 'hidden',
                    title: 'Chi tiết phiếu xuất',
                    to: '/phieu-xuat/:id',
                    element: <PhieuXuatDetailsPage title={title} />
                },
                {
                    type: 'hidden',
                    title: 'Sửa phiếu xuất',
                    to: '/phieu-xuat/:id/sua',
                    element: <EditPhieuXuatPage title={title} />
                }
            ]
        },
        {
            type: 'menu',
            title: 'Cẩm nang',
            subLinksPattern: '/cam-nang',
            icon: <FontAwesomeIcon icon={faBook} />,
            subLinks: [
                {
                    type: 'nav',
                    title: 'Danh sách',
                    to: '/cam-nang',
                    element: <CamNangPage title={`Danh sách cẩm nang - ${title}`} />,
                    icon: <FontAwesomeIcon icon={faList} />
                },
                {
                    type: 'nav',
                    title: 'Thêm mới',
                    to: '/cam-nang/them',
                    element: <CreateCamNangPage title={`Thêm cẩm nang - ${title}`} />,
                    icon: <FontAwesomeIcon icon={faPlus} />
                },
                {
                    type: 'hidden',
                    title: 'Chi tiết cẩm nang',
                    to: '/cam-nang/:id',
                    element: <CamNangDetailsPage title={title} />
                },
                {
                    type: 'hidden',
                    title: 'Chỉnh sửa cẩm nang',
                    to: '/cam-nang/:id/sua',
                    element: <EditCamNangPage title={title} />
                }
            ]
        },
        {
            type: 'menu',
            title: 'Quản lý',
            subLinksPattern: '/quan-ly',
            roles: ['admin'],
            icon: <FontAwesomeIcon icon={faHouseLock} />,
            subLinks: [
                {
                    type: 'nav',
                    title: 'Thông tin website',
                    to: '/quan-ly/thong-tin',
                    element: <ManageWebsiteInfoPage title={`Thông tin website - ${title}`} />,
                    icon: <FontAwesomeIcon icon={faCircleInfo} />
                },
                {
                    type: 'nav',
                    title: 'Người dùng',
                    to: '/quan-ly/users',
                    element: <ManageUsersPage title={`Danh sách người dùng - ${title}`} />,
                    icon: <FontAwesomeIcon icon={faUser} />
                },
                {
                    type: 'hidden',
                    title: 'Chi tiết người dùng',
                    to: '/quan-ly/users/:id',
                    element: <ManageUserDetailsPage title={title} />
                },
                {
                    type: 'nav',
                    title: 'Hoạt động',
                    to: '/quan-ly/hoat-dong',
                    element: <ManageActivitiesPage title={`Quản lý hoạt động - ${title}`} />,
                    icon: <FontAwesomeIcon icon={faHistory} />
                }
            ]
        },
        {
            type: 'nav',
            title: 'Tài khoản',
            to: '/my-account',
            element: <AccountPage title={title} />,
            icon: <FontAwesomeIcon icon={faUserGear} />
        },
        {
            type: 'hidden',
            title: 'Chi tiết hoạt động',
            to: '/hoat-dong/:id',
            element: <ActivityDetailsPage title={title} />
        }
    ]
};

export default appConfig;