import CreateLoaiSanPham from '../components/LoaiSanPham/Create/CreateLoaiSanPham';
import LoaiSanPhamList from '../components/LoaiSanPham/List/LoaiSanPhamList';
import NewPost from '../components/Post/NewPost/NewPost';
import PostDetails from '../components/Post/PostDetails/PostDetails';
import PostsList from '../components/Post/PostsList/PostsList';
import CreateSanPham from '../components/SanPham/Create/CreateSanPham';
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
            type: 'nav',
            title: 'second',
            to: '/second',
            element: <div>second</div>
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
                    title: 'Thêm mới',
                    type: 'nav',
                    to: '/san-pham/them',
                    element: <CreateSanPham />
                }
            ]
        }
    ]
};

export default appConfig;