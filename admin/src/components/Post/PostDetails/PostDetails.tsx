import { useQuery } from '@apollo/client';
import {
    Breadcrumbs,
    Anchor,
    LoadingOverlay,
    Text
} from '@mantine/core';
import RichTextEditor from '@mantine/rte';
import React from 'react';
import { useParams } from 'react-router-dom';
import { GET_SINGLE_POST } from '../../../graphql/queries/post';
import useGoBack from '../../../hooks/useGoBack';

import useStyles from '../Editor.styles';

interface PostDetails {
    id: string;
    title: string;
    content: string;
    createdBy: {
        id: string;
        fullname: string;
    };
    createdAt: number;
    updatedAt: number;
}

const PostDetails = () => {
    const { id } = useParams();
    const goBack = useGoBack('/bai-viet');
    const { data: post, loading, error } = useQuery<{ singlePost: PostDetails }>(GET_SINGLE_POST, {
        variables: {
            singlePostId: id
        }
    });
    const { classes } = useStyles();

    return (
        <div style={{ position: 'relative', height: '100%' }}>
            <LoadingOverlay visible={loading} />
            <Breadcrumbs sx={{ display: 'flex', alignItems: 'center' }}>
                <Anchor component='div' onClick={goBack}>
                    Danh sách bài viết
                </Anchor>
                <Anchor component='div'>
                    {loading ? 'Loading...' : error ?
                        'Không tìm thấy bài viết' :
                        <div style={{
                            width: '100%',
                            overflowWrap: 'break-word',
                            whiteSpace: 'break-spaces'
                        }}>
                            {post?.singlePost.title}
                        </div>
                    }
                </Anchor>
            </Breadcrumbs>
            {post && (<>
                <h2>
                    <div className='overflow-break-word'>
                        {post.singlePost.title}
                    </div>
                </h2>
                <Text color='dimmed'>
                    Đăng ngày {new Date(post.singlePost.createdAt).toLocaleString('vi-VN')}
                </Text>
                <RichTextEditor
                    value={post.singlePost.content}
                    readOnly
                    className={classes.rte}
                    onChange={() => void(0)}
                />
            </>)}
        </div>
    );
};

export default PostDetails;