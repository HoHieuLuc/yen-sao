import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useForm } from '@mantine/form';
import appConfig from '../../config';

import { RichTextEditor } from '@mantine/rte';
import { Group, Button, TextInput } from '@mantine/core';
import { showNotification } from '@mantine/notifications';

import { CREATE_POST } from '../../graphql/queries/post';
import { SINGLE_UPLOAD } from '../../graphql/queries/upload';

const NewPost = () => {
    const [content, setContent] = useState('');
    const [uploadImage] = useMutation(SINGLE_UPLOAD);
    const [createPost, { loading }] = useMutation(CREATE_POST, {
        onCompleted: () => showNotification({
            title: 'Thông báo',
            message: 'Đăng bài viết thành công',
        })
    });

    const postForm = useForm({
        initialValues: {
            title: ''
        },
        validate: {
            title: (value) => value ? null : 'Vui lòng nhập tiêu đề'
        }
    });

    const handleImageUpload = async (file) => {
        const { data } = await uploadImage({
            variables: {
                file
            }
        });
        return `${appConfig.apiURL}${data.singleUpload}`;
    };

    const handleCreatePost = async (values) => {
        createPost({
            variables: {
                ...values,
                content
            }
        });
    };

    return (
        <form onSubmit={postForm.onSubmit(handleCreatePost)}>
            <TextInput
                mb='xs'
                label='Tiêu đề'
                placeholder='Nhập tiêu đề'
                {...postForm.getInputProps('title')}
            />
            <RichTextEditor
                value={content}
                onChange={setContent}
                sticky={true}
                stickyOffset={50}
                onImageUpload={handleImageUpload}
                className='rich-text-editor'
            />
            <Group position='right' mt='md'>
                <Button type='submit' loading={loading}>Xác nhận</Button>
            </Group>
        </form>
    );
};

export default NewPost;