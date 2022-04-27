import { useQuery } from '@apollo/client';
import { Link, useSearchParams } from 'react-router-dom';

import { Table, Pagination, Center, LoadingOverlay, Anchor, Tooltip } from '@mantine/core';
import { POSTS_LIST } from '../../../graphql/queries/post';
import useStyle from './PostsList.styles';

interface Post {
    id: string;
    title: string;
    createdAt: number;
    updatedAt: number;
    createdBy: CreatedBy;
}

interface CreatedBy {
    id: string;
    username: string;
}

interface PageVars {
    page: number;
    limit: number;
}

interface PageInfo extends PageVars {
    totalPages: number;
}

interface AllPosts {
    allPosts: {
        posts: Array<Post>;
        pageInfo: PageInfo;
    };
}

const PostsList = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get('page') || '1');
    const limit = 10;
    const { data: postsResult, loading } = useQuery<
        AllPosts, PageVars
    >(POSTS_LIST, {
        variables: {
            page: currentPage,
            limit
        },
        fetchPolicy: 'no-cache'
    });
    const { classes } = useStyle();

    const handlePageChange = (page: number) => {
        const _page = page.toString();
        setSearchParams({ _page });
    };

    const allPosts = postsResult ? postsResult.allPosts.posts : [];

    const postElements = allPosts.map((post) => (
        <tr key={post.id}>
            <td className={classes.tableRow}>
                <Tooltip
                    withArrow
                    wrapLines
                    width={300}
                    label={post.title}
                    transition='fade'
                    transitionDuration={200}
                    className={classes.item}
                    color='indigo'
                    position='top'
                    placement='start'
                >
                    <Anchor component={Link} to={`/bai-viet/${post.id}`} className={classes.item}>
                        {post.title}
                    </Anchor>
                </Tooltip>
            </td>
            <td>{post.createdBy.username}</td>
            <td>{new Date(post.createdAt).toLocaleString('vi-VN')}</td>
            <td>{new Date(post.updatedAt).toLocaleString('vi-VN')}</td>
        </tr>
    ));

    return (
        <div style={{ position: 'relative', height: '100%' }}>
            <LoadingOverlay visible={loading} />
            <Table striped highlightOnHover>
                <thead>
                    <tr>
                        <th>Tiêu đề</th>
                        <th>Người đăng</th>
                        <th>Ngày đăng</th>
                        <th>Ngày sửa</th>
                    </tr>
                </thead>
                <tbody>
                    {postElements}
                </tbody>
            </Table>
            {postsResult && (
                <Center mt='sm'>
                    <Pagination
                        total={postsResult.allPosts.pageInfo.totalPages}
                        siblings={1}
                        page={currentPage}
                        onChange={handlePageChange}
                    />
                </Center>
            )}
        </div>
    );
};

export default PostsList;