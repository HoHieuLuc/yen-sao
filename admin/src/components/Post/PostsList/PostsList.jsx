import { useQuery } from '@apollo/client';
import { useSearchParams } from 'react-router-dom';

import { Table, Pagination, Center, LoadingOverlay } from '@mantine/core';
import { POSTS_LIST } from '../../../graphql/queries/post';
import useStyle from './PostsList.styles';
import { Tooltip } from '@mantine/core';

const PostsList = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get('page')) || 1;
    const limit = 10;
    const { data: postsResult, loading } = useQuery(POSTS_LIST, {
        variables: {
            page: currentPage,
            limit
        },
        fetchPolicy: 'no-cache'
    });
    const { classes } = useStyle();

    const handlePageChange = (page) => {
        setSearchParams({ page });
    };

    const allPosts = postsResult ? postsResult.allPosts.posts : [];

    const postElements = allPosts.map((post) => (
        <tr key={post.id}>
            <td>
                <Tooltip
                    withArrow
                    label={post.title}
                    transition='fade'
                    transitionDuration={200}
                    className={classes.item}
                    color='indigo'
                    position='top'
                    placement='start'
                >
                    {post.title}
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
            <Table striped highlightOnHover className={classes.fixedTable}>
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
            {(postsResult && postsResult.allPosts.pageInfo) && (<Center mt='sm'>
                <Pagination
                    total={parseInt(postsResult.allPosts.pageInfo.totalPages)}
                    siblings={1}
                    page={currentPage}
                    onChange={handlePageChange}
                />
            </Center>)}
        </div>
    );
};

export default PostsList;