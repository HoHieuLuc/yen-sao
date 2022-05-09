import { useMutation } from '@apollo/client';
import { useForm } from '@mantine/form';
import useGlobalStyles from '../../../utils/global.styles';

import { Button, Group } from '@mantine/core';
import RichTextEditor from '@mantine/rte';
import { Link } from 'react-router-dom';

import { SINGLE_UPLOAD } from '../../../graphql/queries/upload';
import { showErrorNotification } from '../../../events';

interface SingleUpload {
    singleUpload: string;
}

interface Props {
    inititalValue: string;
    loading: boolean;
    handleSubmit: (
        value: string
    ) => void;
}

const AboutForm = ({ inititalValue, loading, handleSubmit }: Props) => {
    const { classes } = useGlobalStyles();
    const [uploadImage] = useMutation<{ upload: SingleUpload }>(SINGLE_UPLOAD);

    const aboutForm = useForm({
        initialValues: {
            value: inititalValue
        }
    });

    const handleImageUpload = async (file: File) => {
        const { data, errors } = await uploadImage({
            variables: {
                file
            },
            onError: (error) => showErrorNotification(`
                Đăng ảnh thất bại. Lỗi: ${error.message}
            `)
        });

        if (!data || errors) {
            return '';
        }
        return data.upload.singleUpload;
    };

    const onSubmit = (values: typeof aboutForm.values) => {
        handleSubmit(values.value);
    };

    return (
        <form onSubmit={aboutForm.onSubmit(onSubmit)}>
            <RichTextEditor
                sticky={true}
                stickyOffset={50}
                onImageUpload={handleImageUpload}
                {...aboutForm.getInputProps('value')}
                placeholder='Nhập nội dung bài viết giới thiệu'
                className={classes.rte}
            />
            <Group position='right' mt='md'>
                <Button
                    color='red'
                    component={Link}
                    to='/manage/about'
                >
                    Quay lại
                </Button>
                <Button
                    type='submit'
                    loading={loading}
                >
                    Xác nhận
                </Button>
            </Group>
        </form>
    );
};

export default AboutForm;