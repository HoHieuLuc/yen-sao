import useGlobalStyles from '../../../utils/global.styles';
import { useUpload } from '../../../hooks';
import { useForm } from '@mantine/form';

import { Button, Group } from '@mantine/core';
import RichTextEditor from '@mantine/rte';
import { Link } from 'react-router-dom';

interface Props {
    inititalValue: string;
    loading: boolean;
    handleSubmit: (
        value: string
    ) => void;
}

const AboutForm = ({ inititalValue, loading, handleSubmit }: Props) => {
    const { classes } = useGlobalStyles();
    const { singleUpload } = useUpload();

    const aboutForm = useForm({
        initialValues: {
            value: inititalValue
        }
    });

    const onSubmit = (values: typeof aboutForm.values) => {
        handleSubmit(values.value);
    };

    return (
        <form onSubmit={aboutForm.onSubmit(onSubmit)}>
            <RichTextEditor
                sticky
                stickyOffset={50}
                onImageUpload={singleUpload}
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