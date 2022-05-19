import Dashboard from '../components/Dashboard/Dashboard';

import Account from '../components/Account/Account';

import EditAbout from '../components/Manage/About/EditAbout';
import About from '../components/Manage/About/About';

import PhieuNhapDetailsPage from '../components/PhieuNhap/Details/PhieuNhapDetailsPage';
import EditPhieuNhapPage from '../components/PhieuNhap/Edit/EditPhieuNhapPage';
import CreatePhieuNhap from '../components/PhieuNhap/Create/CreatePhieuNhap';
import PhieuNhapList from '../components/PhieuNhap/List/PhieuNhapList';

import PhieuXuatDetailsPage from '../components/PhieuXuat/Details/PhieuXuatDetailsPage';
import EditPhieuXuatPage from '../components/PhieuXuat/Edit/EditPhieuXuatPage';
import CreatePhieuXuat from '../components/PhieuXuat/Create/CreatePhieuXuat';
import PhieuXuatList from '../components/PhieuXuat/List/PhieuXuatList';

import SanPhamDetailsPage from '../components/SanPham/Details/SanPhamDetailsPage';
import CreateSanPham from '../components/SanPham/Create/CreateSanPham';
import EditSanPham from '../components/SanPham/Edit/EditSanPham';
import SanPhamList from '../components/SanPham/List/SanPhamList';

import ActivityDetailsPage from '../components/Activity/Details/ActivityDetailsPage';
import ActivityListPage from '../components/Activity/List/ActivityListPage';

import UserDetails from '../components/Manage/User/Details/UserDetails';
import UserList from '../components/Manage/User/List/UserList';

import { AppConfig } from './types';

const appConfig: AppConfig = {
    title: 'Yến sào MS.Tưởng',
    apiURL: 'http://localhost:4000',
    links: [
        {
            type: 'nav',
            title: 'Trang chủ',
            to: '/',
            element: <Dashboard title='Yến sào MS.Tuởng' />
        },
        {
            type: 'menu',
            title: 'Sản phẩm',
            subLinksPattern: '/san-pham',
            subLinks: [
                {
                    title: 'Danh sách',
                    type: 'nav',
                    to: '/san-pham',
                    element: <SanPhamList title='Danh sách sản phẩm' />
                },
                {
                    title: 'Thêm mới',
                    type: 'nav',
                    to: '/san-pham/them',
                    roles: ['admin'],
                    element: <CreateSanPham title='Thêm sản phẩm mới' />
                },
                {
                    title: 'Sửa',
                    type: 'hidden',
                    to: '/san-pham/:id/sua',
                    roles: ['admin'],
                    element: <EditSanPham />
                },
                {
                    title: 'Chi tiết',
                    type: 'hidden',
                    to: '/san-pham/:id',
                    element: <SanPhamDetailsPage />
                }
            ]
        },
        {
            type: 'menu',
            title: 'Nhập hàng',
            subLinksPattern: '/phieu-nhap',
            subLinks: [
                {
                    type: 'nav',
                    title: 'Danh sách',
                    to: '/phieu-nhap',
                    element: <PhieuNhapList title='Danh sách phiếu nhập' />
                },
                {
                    type: 'nav',
                    title: 'Tạo phiếu nhập',
                    to: '/phieu-nhap/them',
                    element: <CreatePhieuNhap title='Tạo phiếu nhập' />
                },
                {
                    type: 'hidden',
                    title: 'Chi tiết phiếu nhập',
                    to: '/phieu-nhap/:id',
                    element: <PhieuNhapDetailsPage />
                },
                {
                    type: 'hidden',
                    title: 'Chỉnh sửa phiếu nhập',
                    to: '/phieu-nhap/:id/sua',
                    element: <EditPhieuNhapPage />
                }
            ]
        },
        {
            type: 'menu',
            title: 'Xuất hàng',
            subLinksPattern: '/phieu-xuat',
            subLinks: [
                {
                    type: 'nav',
                    title: 'Danh sách',
                    to: '/phieu-xuat',
                    element: <PhieuXuatList title='Danh sách phiếu xuất' />
                },
                {
                    type: 'nav',
                    title: 'Tạo phiếu xuất',
                    to: '/phieu-xuat/them',
                    element: <CreatePhieuXuat title='Tạo phiếu xuất' />
                },
                {
                    type: 'hidden',
                    title: 'Chi tiết phiếu xuất',
                    to: '/phieu-xuat/:id',
                    element: <PhieuXuatDetailsPage />
                },
                {
                    type: 'hidden',
                    title: 'Sửa phiếu xuất',
                    to: '/phieu-xuat/:id/sua',
                    element: <EditPhieuXuatPage />
                }
            ]
        },
        {
            type: 'menu',
            title: 'Quản lý',
            subLinksPattern: '/quan-ly',
            roles: ['admin'],
            subLinks: [
                {
                    type: 'nav',
                    title: 'Bài viết giới thiệu',
                    to: '/quan-ly/about',
                    element: <About title='Bài viết giới thiệu' />
                },
                {
                    type: 'hidden',
                    title: 'Chỉnh sửa bài viết giới thiệu',
                    to: '/quan-ly/about/sua',
                    element: <EditAbout title='Bài viết giới thiệu | Chỉnh sửa' />
                },
                {
                    type: 'nav',
                    title: 'Người dùng',
                    to: '/quan-ly/users',
                    element: <UserList title='Danh sách người dùng' />
                }, 
                {
                    type: 'hidden',
                    title: 'Chi tiết người dùng',
                    to: '/quan-ly/users/:id',
                    element: <UserDetails />
                }, 
                {
                    type: 'nav',
                    title: 'Hoạt động',
                    to: '/quan-ly/hoat-dong',
                    element: <ActivityListPage title='Quản lý hoạt động' />
                }
            ]
        },
        {
            type: 'nav',
            title: 'Tài khoản',
            to: '/my-account',
            element: <Account title='Tài khoản' />
        },
        {
            type: 'hidden',
            title: 'Chi tiết hoạt động',
            to: '/hoat-dong/:id',
            element: <ActivityDetailsPage title='Chi tiết hoạt động' />
        }
    ]
};

export default appConfig;