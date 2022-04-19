import { useMutation } from '@apollo/client';
import { useForm } from '@mantine/form';
import appConfig from '../../../config';

import { RichTextEditor } from '@mantine/rte';
import { Group, Button, TextInput } from '@mantine/core';
import { showNotification } from '@mantine/notifications';

import { CREATE_POST } from '../../../graphql/queries/post';
import { SINGLE_UPLOAD } from '../../../graphql/queries/upload';

import useStyles from '../Editor.styles';

const NewPost = () => {
    const [uploadImage] = useMutation(SINGLE_UPLOAD);
    const [createPost, { loading }] = useMutation(CREATE_POST, {
        onCompleted: () => showNotification({
            title: 'Thông báo',
            message: 'Đăng bài viết thành công',
        })
    });

    const postForm = useForm({
        initialValues: {
            title: '',
            content: ''
        },
        validate: {
            title: (value) => value ? null : 'Vui lòng nhập tiêu đề'
        }
    });

    const { classes } = useStyles();

    const handleImageUpload = async (file) => {
        const { data } = await uploadImage({
            variables: {
                file
            }
        });
        return `${appConfig.apiURL}${data.singleUpload}`;
    };

    const handleCreatePost = (values) => {
        if (values.content.replace(/<(.|\n)*?>/g, '').trim().length === 0) {
            return showNotification({
                title: 'Thông báo',
                message: 'Vui lòng nhập nội dung bài viết',
                color: 'red'
            });
        } 
        createPost({
            variables: {
                ...values,
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
                {...postForm.getInputProps('content')}
                sticky={true}
                stickyOffset={50}
                onImageUpload={handleImageUpload}
                className={classes.rte}
            />
            <Group position='right' mt='md'>
                <Button
                    type='submit'
                    loading={loading}
                >Xác nhận</Button>
            </Group>
        </form>
    );
};

export default NewPost;