import { useEffect, useState } from 'react';
import { useForm } from '@mantine/form';

import { Button, NumberInput, Select, SimpleGrid } from '@mantine/core';
import SanPhamSelect from '../../SanPham/Form/SanPhamSelect';

import { ChiTietPhieuXuatFormData } from '../../../types';

interface BaseProps {
    type: 'create' | 'update';
    initialValues?: unknown;
    onSubmit: (
        values: ChiTietPhieuXuatFormData,
        callback: () => void
    ) => void;
    onDelete?: () => void;
    loading: boolean;
}

interface UpdateProps extends BaseProps {
    type: 'update';
    initialValues: {
        maSanPham: string;
        tenSanPham: string;
        soLuongTon: number;
        soLuongXuat: number;
        donGiaXuat: number;
    };
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
    const chiTietPhieuXuatForm = useForm<ChiTietPhieuXuatFormData>({
        initialValues: {
            maSanPham: type === 'update' ? initialValues.maSanPham : '',
            soLuongXuat: type === 'update' ? initialValues.soLuongXuat : 0,
            donGiaXuat: type === 'update' ? initialValues.donGiaXuat : 0,
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
                soLuongXuat: initialValues.soLuongXuat,
                donGiaXuat: initialValues.donGiaXuat,
            });
        }
    }, [lock]);

    const submit = (values: ChiTietPhieuXuatFormData) => {
        onSubmit(values, () => chiTietPhieuXuatForm.reset());
    };

    return (
        <form onSubmit={chiTietPhieuXuatForm.onSubmit(submit)}>
            <SimpleGrid cols={1} spacing='xs'>
                {(lock && type === 'update')
                    ? <Select
                        label='Tên sản phẩm'
                        description={`Số lượng tồn: ${initialValues.soLuongTon}`}
                        defaultValue={initialValues.maSanPham}
                        data={[{
                            value: initialValues.maSanPham,
                            label: initialValues.tenSanPham
                        }]}
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
                    min={0}
                    {...chiTietPhieuXuatForm.getInputProps('donGiaXuat')}
                    disabled={lock}
                />
                <NumberInput
                    label='Số lượng xuất'
                    placeholder='Số lượng xuất'
                    min={0}
                    {...chiTietPhieuXuatForm.getInputProps('soLuongXuat')}
                    disabled={lock}
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