import useGlobalStyles from '../../../utils/global.styles';
import { useUpload } from '../../../hooks';
import { useForm } from '@mantine/form';
import { useState } from 'react';

import CurrencyInput from '../../Utils/Input/CurrencyInput';
import ImageDropzone from '../ImageDropzone/ImageDropzone';
import RichTextEditor from '@mantine/rte';
import {
    Accordion, Button, Group, InputWrapper, MultiSelect,
    Stack, Switch, Text, Textarea, TextInput
} from '@mantine/core';

import { showErrorNotification } from '../../../events';
import { SanPhamFormData } from '../../../types';

interface Props {
    loading: boolean;
    initialValues?: SanPhamFormData;
    onSubmit: (values: SanPhamFormData, callback: () => void) => void;
}

const SanPhamForm = ({ loading, initialValues, onSubmit }: Props) => {
    const sanPhamForm = useForm<SanPhamFormData>({
        initialValues: {
            tenSanPham: initialValues?.tenSanPham || '',
            donGiaSi: initialValues?.donGiaSi || 0,
            donGiaLe: initialValues?.donGiaLe || 0,
            donGiaTuyChon: initialValues?.donGiaTuyChon || '',
            moTa: initialValues?.moTa || '',
            xuatXu: initialValues?.xuatXu || '',
            tags: initialValues?.tags || [],
            anhSanPham: initialValues?.anhSanPham || [],
            isPublic: initialValues?.isPublic || false,
            isFeatured: initialValues?.isFeatured || false,
        },
        validate: {
            tenSanPham: (value) => value ? null : 'Tên sản phẩm không được để trống'
        },
    });

    const { singleUpload } = useUpload();
    const { classes } = useGlobalStyles();
    const [donGiaSwitch, setDonGiaSwitch] = useState(
        sanPhamForm.values.donGiaTuyChon !== ''
    );

    const handleOnChangeImages = (imageUrls: Array<string>) => {
        sanPhamForm.setFieldValue(
            'anhSanPham',
            [...sanPhamForm.values.anhSanPham, ...imageUrls]
        );
    };

    const handleRemoveImage = (imageUrl: string) => {
        sanPhamForm.setFieldValue(
            'anhSanPham',
            sanPhamForm.values.anhSanPham.filter((url) => url !== imageUrl)
        );
    };

    const submit = (values: SanPhamFormData) => {
        if (values.anhSanPham.length === 0) {
            return showErrorNotification('Vui lòng chọn ít nhất 1 ảnh');
        }
        onSubmit(values, () => sanPhamForm.reset());
    };

    return (
        <form onSubmit={sanPhamForm.onSubmit(submit)} spellCheck={false}>
            <Stack spacing='xs'>
                <TextInput
                    label='Tên sản phẩm'
                    placeholder='Nhập tên sản phẩm'
                    {...sanPhamForm.getInputProps('tenSanPham')}
                    required
                />
                {donGiaSwitch
                    ? <Textarea
                        label='Đơn giá tùy chọn (bỏ trống nếu có giá sỉ/lẻ)'
                        placeholder='Nhập đơn giá tùy chọn'
                        {...sanPhamForm.getInputProps('donGiaTuyChon')}
                    />
                    : <Group position='center' grow spacing='xs'>
                        <CurrencyInput
                            label='Đơn giá sỉ/100gram'
                            placeholder='Nhập đơn giá sỉ'
                            {...sanPhamForm.getInputProps('donGiaSi')}
                            hideControls
                        />
                        <CurrencyInput
                            label='Đơn giá lẻ/100gram'
                            placeholder='Nhập đơn giá lẻ'
                            {...sanPhamForm.getInputProps('donGiaLe')}
                            hideControls
                        />
                    </Group>
                }
                <Text
                    variant='link'
                    onClick={() => setDonGiaSwitch(!donGiaSwitch)}
                    style={{ cursor: 'pointer' }}
                >
                    {donGiaSwitch ? 'Hoặc nhập đơn giá sỉ/lẻ' : 'Hoặc nhập đơn giá tùy chọn'}
                </Text>
                <InputWrapper label='Mô tả'>
                    <RichTextEditor
                        placeholder='Nhập mô tả'
                        {...sanPhamForm.getInputProps('moTa')}
                        onImageUpload={singleUpload}
                        className={classes.rte}
                        stickyOffset={50}
                        sticky
                    />
                </InputWrapper>
                <TextInput
                    label='Xuất xứ'
                    placeholder='Nhập xuất xứ'
                    {...sanPhamForm.getInputProps('xuatXu')}
                />
                <MultiSelect
                    label='Nhập tags'
                    data={sanPhamForm.values.tags}
                    placeholder='Nhập tags'
                    {...sanPhamForm.getInputProps('tags')}
                    getCreateLabel={(query) => `+ Thêm tag ${query}`}
                    onCreate={(query) =>
                        sanPhamForm.setFieldValue(
                            'tags',
                            [...sanPhamForm.values.tags, query]
                        )
                    }
                    searchable
                    creatable
                />
                <Switch
                    label='Công khai sản phẩm (Chỉ sản phẩm công khai mới hiện trên trang quảng bá)'
                    {...sanPhamForm.getInputProps('isPublic')}
                    checked={sanPhamForm.values.isPublic}
                />
                {sanPhamForm.values.isPublic && <Switch
                    label={
                        <div>
                            Đưa sản phẩm lên đầu trang
                            {' '}
                            (Sản phẩm này sẽ được ưu tiên đưa lên đầu trang, chỉ hiện tối đa 3 sản phẩm)
                        </div>
                    }
                    {...sanPhamForm.getInputProps('isFeatured')}
                    checked={sanPhamForm.values.isFeatured}
                />}
                <Accordion>
                    <Accordion.Item label='Đăng ảnh'>
                        <ImageDropzone
                            images={sanPhamForm.values.anhSanPham}
                            onChange={handleOnChangeImages}
                            onRemoveImage={handleRemoveImage}
                            maxLength={5}
                        />
                    </Accordion.Item>
                </Accordion>
                <Group position='right'>
                    <Button
                        type='submit'
                        loading={loading}
                    >
                        Xác nhận
                    </Button>
                </Group>
            </Stack>
        </form>
    );
};

export default SanPhamForm;