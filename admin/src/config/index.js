import NewPost from '../components/Post/NewPost/NewPost';
import PostDetails from '../components/Post/PostDetails/PostDetails';
import PostsList from '../components/Post/PostsList/PostsList';

const appConfig = {
    title: 'Yến sào MS.Tưởng',
    apiURL: 'http://localhost:4000',
    links: [
        {
            title: 'Bài viết',
            subLinksPattern: '/bai-viet',
            subLinks: [
                {
                    to: '/bai-viet/them',
                    title: 'Thêm bài viết mới',
                    element: <NewPost />,
                },
                {
                    to: '/bai-viet',
                    title: 'Danh sách bài viết',
                    element: <PostsList />,
                },
                {
                    to: '/bai-viet/:id',
                    element: <PostDetails />,
                    isNotNavLink: true
                }
            ]
        },
        {
            title: 'second',
            to: '/second',
            element: <div>second</div>
        }
    ]
};

export default appConfig;