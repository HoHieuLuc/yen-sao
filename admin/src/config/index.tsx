import Dashboard from '../components/Dashboard/Dashboard';

import Account from '../components/Account/Account';

import About from '../components/Manage/About/About';
import EditAbout from '../components/Manage/About/EditAbout';

import CreatePhieuNhap from '../components/PhieuNhap/Create/CreatePhieuNhap';
import PhieuNhapDetails from '../components/PhieuNhap/Details/PhieuNhapDetails';
import EditPhieuNhapPage from '../components/PhieuNhap/Edit/EditPhieuNhapPage';
import PhieuNhapList from '../components/PhieuNhap/List/PhieuNhapList';

import CreatePhieuXuat from '../components/PhieuXuat/Create/CreatePhieuXuat';
import PhieuXuatDetails from '../components/PhieuXuat/Details/PhieuXuatDetails';
import EditPhieuXuatPage from '../components/PhieuXuat/Edit/EditPhieuXuatPage';
import PhieuXuatList from '../components/PhieuXuat/List/PhieuXuatList';

import CreateSanPham from '../components/SanPham/Create/CreateSanPham';
import SanPhamDetails from '../components/SanPham/Details/SanPhamDetails';
import EditSanPham from '../components/SanPham/Edit/EditSanPham';
import SanPhamList from '../components/SanPham/List/SanPhamList';

import { AppConfig } from './types';

const appConfig: AppConfig = {
    title: 'Yến sào MS.Tưởng',
    apiURL: 'http://localhost:4000',
    links: [
        {
            type: 'nav',
            title: 'Trang chủ',
            to: '/',
            element: <Dashboard title='Yến sào Ms.Tuỏng' />
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
                    element: <CreateSanPham title='Thêm sản phẩm mới' />
                },
                {
                    title: 'Sửa',
                    type: 'hidden',
                    to: '/san-pham/:id/sua',
                    element: <EditSanPham />
                },
                {
                    title: 'Chi tiết',
                    type: 'hidden',
                    to: '/san-pham/:id',
                    element: <SanPhamDetails />
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
                    element: <PhieuNhapDetails />
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
                    element: <PhieuXuatDetails />
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
            subLinksPattern: '/manage',
            subLinks: [
                {
                    type: 'nav',
                    title: 'Bài viết giới thiệu',
                    to: '/manage/about',
                    element: <About title='Bài viết giới thiệu' />
                },
                {
                    type: 'hidden',
                    title: 'Chỉnh sửa bài viết giới thiệu',
                    to: '/manage/about/sua',
                    element: <EditAbout title='Bài viết giới thiệu | Chỉnh sửa' />
                }
            ]
        },
        {
            type: 'nav',
            title: 'Tài khoản',
            to: '/my-account',
            element: <Account title='Tài khoản' />
        }
    ]
};

export default appConfig;