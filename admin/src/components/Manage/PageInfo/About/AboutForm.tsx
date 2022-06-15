import useGlobalStyles from '../../../../utils/global.styles';
import { useUpload } from '../../../../hooks';
import { useForm } from '@mantine/form';

import { Button, Group } from '@mantine/core';
import RichTextEditor from '@mantine/rte';

interface Props {
    inititalValue: string;
    loading: boolean;
    onSubmit: (
        value: string
    ) => void;
    setEditMode: (editMode: boolean) => void;
}

const AboutForm = ({ inititalValue, loading, onSubmit, setEditMode }: Props) => {
    const { classes } = useGlobalStyles();
    const { singleUpload } = useUpload();

    const aboutForm = useForm({
        initialValues: {
            value: inititalValue
        }
    });

    const submit = (values: typeof aboutForm.values) => {
        onSubmit(values.value);
    };

    return (
        <form onSubmit={aboutForm.onSubmit(submit)} spellCheck={false}>
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
                    onClick={() => setEditMode(false)}
                >
                    Hủy
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