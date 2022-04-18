import NewPost from '../components/Post/NewPost/NewPost';
import PostsList from '../components/Post/PostsList/PostsList';

const appConfig = {
    title: 'Yến sào MS.Tưởng',
    apiURL: 'http://localhost:4000',
    navLinks: [
        {
            title: 'Bài viết',
            subLinks: [
                {
                    to: '/them-bai-viet',
                    title: 'Thêm bài viết mới',
                    element: <NewPost />
                },
                {
                    to: '/danh-sach-bai-viet',
                    title: 'Danh sách bài viết',
                    element: <PostsList />
                },
                {
                    to: '/sixth',
                    title: 'sixth',
                    element: <div>sixth</div>
                }
            ]
        },
        {
            to: '/second',
            title: 'second',
            element: <div>second</div>
        },
    ]
};

export default appConfig;