import { useMutation } from '@apollo/client';
import { useForm } from '@mantine/form';
import appConfig from '../../../config';

import { RichTextEditor } from '@mantine/rte';
import { Group, Button, TextInput } from '@mantine/core';
import { showNotification } from '@mantine/notifications';

import { CREATE_POST } from '../../../graphql/queries/post';
import { SINGLE_UPLOAD } from '../../../graphql/queries/upload';

import useStyles from '../Editor.styles';

interface SingleUpload {
    singleUpload: string;
}

interface PostVars {
    title: string;
    content: string;
}

const NewPost = () => {
    const [uploadImage] = useMutation<{ upload: SingleUpload }>(SINGLE_UPLOAD);
    const [createPost, { loading }] = useMutation<
        never, PostVars
    >(CREATE_POST, {
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

    type PostFormValues = typeof postForm.values;

    const { classes } = useStyles();

    const handleImageUpload = async (file: File) => {
        const { data } = await uploadImage({
            variables: {
                file
            }
        });
        if (!data) {
            showNotification({
                title: 'Thông báo',
                message: 'Đăng ảnh thất bại',
                color: 'red'
            });
            return '';
        }
        return `${appConfig.apiURL}${data.upload.singleUpload}`;
    };

    const handleCreatePost = (values: PostFormValues) => {
        if (values.content.replace(/<(.|\n)*?>/g, '').trim().length === 0) {
            return showNotification({
                title: 'Thông báo',
                message: 'Vui lòng nhập nội dung bài viết',
                color: 'red'
            });
        }
        void createPost({
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