import NewPost from '../components/Post/NewPost/NewPost';
import PostDetails from '../components/Post/PostDetails/PostDetails';
import PostsList from '../components/Post/PostsList/PostsList';
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
                    isNotNavLink: true,
                    title: 'Chi tiết bài viết',
                }
            ]
        },
        {
            type: 'nav',
            title: 'second',
            to: '/second',
            element: <div>second</div>
        }
    ]
};

export default appConfig;