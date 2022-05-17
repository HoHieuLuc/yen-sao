import { useEffect, useState } from 'react';
import { useForm } from '@mantine/form';

import { Button, NumberInput, Select, SimpleGrid, Textarea } from '@mantine/core';
import SanPhamSelect from '../../SanPham/Form/SanPhamSelect';

import { ChiTietPhieuXuatInput } from '../../../types';

interface BaseProps {
    type: 'create' | 'update';
    initialValues?: unknown;
    onSubmit: (
        values: ChiTietPhieuXuatInput,
        callback: () => void
    ) => void;
    onDelete?: () => void;
    loading: boolean;
}

interface UpdateProps extends BaseProps {
    type: 'update';
    initialValues: {
        tenSanPham: string;
        soLuongTon: number;
    } & ChiTietPhieuXuatInput;
    onDelete: () => void;
}

interface CreateProps extends BaseProps {
    type: 'create';
}

type Props = UpdateProps | CreateProps;

const ChiTietPhieuXuatForm = ({
    initialValues,
    type,
    onSubmit,
    onDelete,
    loading
}: Props) => {
    const chiTietPhieuXuatForm = useForm<ChiTietPhieuXuatInput>({
        initialValues: {
            maSanPham: type === 'update' ? initialValues.maSanPham : '',
            soLuongXuat: type === 'update' ? initialValues.soLuongXuat / 1000 : 0,
            donGiaXuat: type === 'update' ? initialValues.donGiaXuat : 0,
            ghiChu: type === 'update' ? initialValues.ghiChu : ''
        },
        validate: {
            maSanPham: (value) => value ? null : 'Vui lòng chọn sản phẩm',
            soLuongXuat: (value) => value > 0 ? null : 'Số lượng xuất phải lớn hơn 0',
            donGiaXuat: (value) => value >= 0 ? null : 'Vui lòng nhập đơn giá xuất'
        }
    });

    const [lock, setLock] = useState(type === 'update');

    useEffect(() => {
        if (type === 'update' && lock) {
            chiTietPhieuXuatForm.setValues({
                maSanPham: initialValues.maSanPham,
                soLuongXuat: initialValues.soLuongXuat / 1000,
                donGiaXuat: initialValues.donGiaXuat,
                ghiChu: initialValues.ghiChu
            });
        }
    }, [lock]);

    const submit = (values: ChiTietPhieuXuatInput) => {
        onSubmit({
            ...values,
            soLuongXuat: values.soLuongXuat * 1000
        }, () => chiTietPhieuXuatForm.reset());
    };

    return (
        <form onSubmit={chiTietPhieuXuatForm.onSubmit(submit)}>
            <SimpleGrid cols={1} spacing='xs'>
                {(lock && type === 'update')
                    ? <Select
                        label='Tên sản phẩm'
                        description={`Số lượng tồn: ${initialValues.soLuongTon / 1000} kg`}
                        defaultValue={initialValues.maSanPham}
                        data={[{
                            value: initialValues.maSanPham,
                            label: initialValues.tenSanPham
                        }]}
                        required
                        disabled
                    />
                    : <SanPhamSelect
                        error={chiTietPhieuXuatForm.errors.maSanPham}
                        maSanPham={chiTietPhieuXuatForm.values.maSanPham}
                        setMaSanPham={(maSanPham) =>
                            chiTietPhieuXuatForm.setFieldValue('maSanPham', maSanPham)
                        }
                    />
                }
                <NumberInput
                    label='Đơn giá xuất'
                    placeholder='Đơn giá xuất'
                    {...chiTietPhieuXuatForm.getInputProps('donGiaXuat')}
                    parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
                    formatter={(value) =>
                        !Number.isNaN(parseFloat(value || 'a'))
                            ? (value || '').replace(
                                /\B(?=(\d{3})+(?!\d))/g,
                                ','
                            )
                            : ''
                    }
                    disabled={lock}
                    required
                    min={0}
                />
                <NumberInput
                    label='Số lượng xuất (kg)'
                    placeholder='Số lượng xuất'
                    {...chiTietPhieuXuatForm.getInputProps('soLuongXuat')}
                    disabled={lock}
                    precision={2}
                    required
                    min={0}
                />
                <Textarea
                    label='Ghi chú'
                    placeholder='Nhập ghi chú'
                    value={chiTietPhieuXuatForm.values.ghiChu}
                    onChange={(e) =>
                        chiTietPhieuXuatForm.setFieldValue('ghiChu', e.target.value)
                    }
                    disabled={lock}
                    autosize
                />
                <SimpleGrid cols={type === 'update' ? 3 : 2}>
                    {type === 'update' && <>
                        <Button
                            color='red'
                            variant='light'
                            type='button'
                            onClick={onDelete}
                        >
                            Xóa
                        </Button>
                        <Button
                            type='button'
                            onClick={() => setLock(prev => !prev)}
                            color='green'
                        >
                            {lock ? 'Sửa' : 'Hủy'}
                        </Button>
                    </>}
                    {type === 'create' && <Button
                        color='red'
                        onClick={() => chiTietPhieuXuatForm.reset()}
                    >
                        Hủy
                    </Button>
                    }
                    <Button
                        type='submit'
                        disabled={lock}
                        loading={loading}
                    >
                        Xác nhận
                    </Button>
                </SimpleGrid>
            </SimpleGrid >
        </form>
    );
};

export default ChiTietPhieuXuatForm;