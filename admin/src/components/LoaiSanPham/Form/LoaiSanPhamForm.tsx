import { useForm } from '@mantine/form';

import { Box, Button, Group, Textarea, TextInput } from '@mantine/core';

import { LoaiSanPham } from '../../../types';

type Callback = () => void;

interface Props extends LoaiSanPham {
    handleSubmit: (values: LoaiSanPham, callback: Callback) => void;
    loading: boolean;
}

const LoaiSanPhamForm = ({ handleSubmit, loading, id, tenLoaiSanPham, moTa }: Props) => {
    const loaiSanPhamForm = useForm({
        initialValues: {
            id,
            tenLoaiSanPham,
            moTa: moTa || ''
        },
        validate: {
            tenLoaiSanPham: (value) => value ? null : 'Vui lòng nhập tên loại sản phẩm',
            moTa: (value) => value ? null : 'Vui lòng nhập mô tả'
        }
    });

    const submit = (values: LoaiSanPham) => handleSubmit(values, () => loaiSanPhamForm.reset());

    return (
        <Box>
            <form onSubmit={loaiSanPhamForm.onSubmit(submit)}>
                <TextInput
                    mb='xs'
                    label='Tên loại sản phẩm'
                    placeholder='Nhập tên loại sản phẩm'
                    {...loaiSanPhamForm.getInputProps('tenLoaiSanPham')}
                />
                <Textarea
                    mb='xs'
                    label='Mô tả'
                    placeholder='Nhập mô tả'
                    {...loaiSanPhamForm.getInputProps('moTa')}
                />
                <Group position='right' mt='md'>
                    <Button
                        type='submit'
                        loading={loading}
                    >
                        Xác nhận
                    </Button>
                </Group>
            </form>
        </Box>
    );
};

export default LoaiSanPhamForm;