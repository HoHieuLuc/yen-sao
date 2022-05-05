import CreateLoaiSanPham from '../components/LoaiSanPham/Create/CreateLoaiSanPham';
import LoaiSanPhamList from '../components/LoaiSanPham/List/LoaiSanPhamList';
import CreatePhieuNhap from '../components/PhieuNhap/Create/CreatePhieuNhap';
import PhieuNhapDetails from '../components/PhieuNhap/Details/PhieuNhapDetails';
import EditPhieuNhap from '../components/PhieuNhap/Edit/EditPhieuNhap';
import PhieuNhapList from '../components/PhieuNhap/List/PhieuNhapList';
import CreatePhieuXuat from '../components/PhieuXuat/Create/CreatePhieuXuat';
import PhieuXuatDetails from '../components/PhieuXuat/Details/PhieuXuatDetails';
import EditPhieuXuat from '../components/PhieuXuat/Edit/EditPhieuXuat';
import PhieuXuatList from '../components/PhieuXuat/List/PhieuXuatList';
import NewPost from '../components/Post/NewPost/NewPost';
import PostDetails from '../components/Post/PostDetails/PostDetails';
import PostsList from '../components/Post/PostsList/PostsList';
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
            type: 'menu',
            title: 'Bài viết',
            subLinksPattern: '/bai-viet',
            subLinks: [
                {
                    type: 'nav',
                    to: '/bai-viet/them',
                    title: 'Thêm bài viết mới',
                    element: <NewPost />,
                },
                {
                    type: 'nav',
                    to: '/bai-viet',
                    title: 'Danh sách bài viết',
                    element: <PostsList />,
                },
                {
                    type: 'hidden',
                    to: '/bai-viet/:id',
                    element: <PostDetails />,
                    title: 'Chi tiết bài viết',
                }
            ]
        },
        {
            type: 'menu',
            title: 'Loại sản phẩm',
            subLinksPattern: '/loai-san-pham',
            subLinks: [
                {
                    title: 'Danh sách',
                    type: 'nav',
                    to: '/loai-san-pham',
                    element: <LoaiSanPhamList />
                },
                {
                    title: 'Thêm mới',
                    type: 'nav',
                    to: '/loai-san-pham/them',
                    element: <CreateLoaiSanPham />
                }
            ]
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
                    element: <SanPhamList />
                },
                {
                    title: 'Thêm mới',
                    type: 'nav',
                    to: '/san-pham/them',
                    element: <CreateSanPham />
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
                    element: <PhieuNhapList />
                },
                {
                    type: 'nav',
                    title: 'Tạo phiếu nhập',
                    to: '/phieu-nhap/them',
                    element: <CreatePhieuNhap />
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
                    element: <EditPhieuNhap />
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
                    element: <PhieuXuatList />
                },
                {
                    type: 'nav',
                    title: 'Tạo phiếu xuất',
                    to: '/phieu-xuat/them',
                    element: <CreatePhieuXuat />
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
                    element: <EditPhieuXuat />
                }
            ]
        }
    ]
};

export default appConfig;