import useGlobalStyles from '../../../utils/global.styles';
import { useUpload } from '../../../hooks';
import { useForm } from '@mantine/form';
import { useState } from 'react';

import ImageDropzone from '../ImageDropzone/ImageDropzone';
import RichTextEditor from '@mantine/rte';
import {
    Accordion, Box, Button, Group, MultiSelect,
    NumberInput, Text, Textarea, TextInput
} from '@mantine/core';

import { showErrorNotification } from '../../../events';
import { SanPhamFormVars } from '../../../types';

interface Props {
    loading: boolean;
    initialValues?: SanPhamFormVars;
    handleSubmit: (values: SanPhamFormVars, callback: () => void) => void;
}

const SanPhamForm = ({ loading, initialValues, handleSubmit }: Props) => {
    const sanPhamForm = useForm<SanPhamFormVars>({
        initialValues: {
            tenSanPham: initialValues?.tenSanPham || '',
            donGiaSi: initialValues?.donGiaSi || 0,
            donGiaLe: initialValues?.donGiaLe || 0,
            donGiaTuyChon: initialValues?.donGiaTuyChon || '',
            moTa: initialValues?.moTa || '',
            xuatXu: initialValues?.xuatXu || '',
            tags: initialValues?.tags || [],
            anhSanPham: initialValues?.anhSanPham || [],
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

    const handleOnChangeImages = (images: Array<string>) => {
        sanPhamForm.setFieldValue(
            'anhSanPham',
            [...sanPhamForm.values.anhSanPham, ...images]
        );
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
        handleSubmit(values, () => sanPhamForm.reset());
    };

    return (
        <Box>
            <form onSubmit={sanPhamForm.onSubmit(submit)}>
                <TextInput
                    mb='xs'
                    label='Tên sản phẩm'
                    placeholder='Nhập tên sản phẩm'
                    {...sanPhamForm.getInputProps('tenSanPham')}
                    required
                />

                {donGiaSwitch
                    ? <Textarea
                        mb='xs'
                        label='Đơn giá tùy chọn (bỏ trống nếu có giá sỉ/lẻ)'
                        placeholder='Nhập đơn giá tùy chọn'
                        {...sanPhamForm.getInputProps('donGiaTuyChon')}
                    />
                    : <Group position='center' grow spacing='xs'>
                        <NumberInput
                            mb='xs'
                            label='Đơn giá sỉ/100gram'
                            placeholder='Nhập đơn giá sỉ'
                            {...sanPhamForm.getInputProps('donGiaSi')}
                            min={0}
                            parser={(value) =>
                                value?.replace(/\$\s?|(,*)/g, '')
                            }
                            formatter={(value) =>
                                !Number.isNaN(parseFloat(value || 'a'))
                                    ? (value || '').replace(
                                        /\B(?=(\d{3})+(?!\d))/g,
                                        ','
                                    )
                                    : ''
                            }
                            hideControls
                        />
                        <NumberInput
                            mb='xs'
                            label='Đơn giá lẻ/100gram'
                            placeholder='Nhập đơn giá lẻ'
                            {...sanPhamForm.getInputProps('donGiaLe')}
                            min={0}
                            parser={(value) =>
                                value?.replace(/\$\s?|(,*)/g, '')
                            }
                            formatter={(value) =>
                                !Number.isNaN(parseFloat(value || 'a'))
                                    ? (value || '').replace(
                                        /\B(?=(\d{3})+(?!\d))/g,
                                        ','
                                    )
                                    : ''
                            }
                            hideControls
                        />
                    </Group>
                }
                <Text
                    variant='link'
                    onClick={() => setDonGiaSwitch(!donGiaSwitch)}
                    style={{ cursor: 'pointer' }}
                    mb='xs'
                >
                    {donGiaSwitch ? 'Hoặc nhập đơn giá sỉ/lẻ' : 'Hoặc nhập đơn giá tùy chọn'}
                </Text>
                <RichTextEditor
                    mb='xs'
                    placeholder='Nhập mô tả'
                    {...sanPhamForm.getInputProps('moTa')}
                    onImageUpload={singleUpload}
                    className={classes.rte}
                    stickyOffset={50}
                    sticky
                />
                <TextInput
                    mb='xs'
                    label='Xuất xứ'
                    placeholder='Nhập xuất xứ'
                    {...sanPhamForm.getInputProps('xuatXu')}
                />
                <MultiSelect
                    label='Nhập tags'
                    data={sanPhamForm.values.tags}
                    placeholder='Nhập tags'
                    searchable
                    creatable
                    getCreateLabel={(query) => `+ Thêm tag ${query}`}
                    onCreate={(query) =>
                        sanPhamForm.setFieldValue(
                            'tags',
                            [...sanPhamForm.values.tags, query]
                        )
                    }
                    {...sanPhamForm.getInputProps('tags')}
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
        </Box >
    );
};

export default SanPhamForm;