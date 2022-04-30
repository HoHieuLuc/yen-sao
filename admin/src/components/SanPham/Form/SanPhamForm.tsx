import { useForm } from '@mantine/form';
import { Accordion, Box, Button, Group, NumberInput, Textarea, TextInput } from '@mantine/core';
import ImageDropzone from '../ImageDropzone/ImageDropzone';
import LoaiSanPhamSelect from '../../LoaiSanPham/Form/LoaiSanPhamSelect';
import { showErrorNotification } from '../../../events';

export interface SanPhamFormVars {
    tenSanPham: string;
    soLuong: number;
    donGia: number;
    moTa: string;
    anhSanPham: Array<string>;
    maLoaiSanPham: string;
}

interface Props {
    loading: boolean;
    initialValues?: SanPhamFormVars;
    handleSubmit: (values: SanPhamFormVars, callback: () => void) => void;
}

const SanPhamForm = ({ loading, initialValues, handleSubmit }: Props) => {
    const sanPhamForm = useForm<SanPhamFormVars>({
        initialValues: {
            tenSanPham: initialValues?.tenSanPham || '',
            soLuong: initialValues?.soLuong || 0,
            donGia: initialValues?.donGia || 0,
            moTa: initialValues?.moTa || '',
            anhSanPham: initialValues?.anhSanPham || [],
            maLoaiSanPham: initialValues?.maLoaiSanPham || ''
        },
        validate: {
            tenSanPham: (value) => value ? null : 'Tên sản phẩm không được để trống',
            moTa: (value) => value ? null : 'Mô tả không được để trống',
            maLoaiSanPham: (value) => value ? null : 'Vui lòng chọn loại sản phẩm'
        },
    });

    const handleOnChangeImages = (images: Array<string>) => {
        sanPhamForm.setFieldValue('anhSanPham', [...sanPhamForm.values.anhSanPham, ...images]);
    };

    const handleRemoveImage = (imageUrl: string) => {
        sanPhamForm.setFieldValue(
            'anhSanPham',
            sanPhamForm.values.anhSanPham.filter((url) => url !== imageUrl)
        );
    };

    const submit = (values: SanPhamFormVars) => {
        if (values.anhSanPham.length === 0) {
            return showErrorNotification('Vui lòng chọn ít nhất 1 ảnh');
        }
        handleSubmit(values, () => {
            sanPhamForm.reset();
        });
    };

    return (
        <Box>
            <form onSubmit={sanPhamForm.onSubmit(submit)}>
                <TextInput
                    mb='xs'
                    label='Tên sản phẩm'
                    placeholder='Nhập tên sản phẩm'
                    {...sanPhamForm.getInputProps('tenSanPham')}
                />
                <NumberInput
                    mb='xs'
                    label='Số lượng'
                    description='Không bắt buộc'
                    placeholder='Nhập số lượng'
                    {...sanPhamForm.getInputProps('soLuong')}
                    min={0}
                    hideControls
                />
                <NumberInput
                    mb='xs'
                    label='Đơn giá'
                    placeholder='Nhập đơn giá'
                    {...sanPhamForm.getInputProps('donGia')}
                    min={0}
                    hideControls
                />
                <Textarea
                    mb='xs'
                    label='Mô tả'
                    placeholder='Nhập mô tả'
                    {...sanPhamForm.getInputProps('moTa')}
                    autosize
                />
                <LoaiSanPhamSelect
                    loaiSanPhamId={sanPhamForm.values.maLoaiSanPham}
                    setLoaiSanPhamId={(value) => sanPhamForm.setFieldValue('maLoaiSanPham', value)}
                    error={sanPhamForm.errors.maLoaiSanPham}
                />
                <Accordion mt={'xs'}>
                    <Accordion.Item label='Đăng ảnh'>
                        <ImageDropzone
                            images={sanPhamForm.values.anhSanPham}
                            onChange={handleOnChangeImages}
                            onRemoveImage={handleRemoveImage}
                        />
                    </Accordion.Item>
                </Accordion>
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

export default SanPhamForm;