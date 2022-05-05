import { useForm } from '@mantine/form';
import { useState } from 'react';

import { Button, NumberInput, Select, SimpleGrid } from '@mantine/core';
import SanPhamSelect from '../../SanPham/Form/SanPhamSelect';

import { ChiTietPhieuNhapFormData } from '../../../types';

interface BaseProps {
    type: 'create' | 'update';
    initialValues?: unknown;
    onSubmit: (
        values: ChiTietPhieuNhapFormData,
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
        soLuongNhap: number;
        donGiaNhap: number;
    };
    onDelete: () => void;
}

interface CreateProps extends BaseProps {
    type: 'create';
}

type Props = UpdateProps | CreateProps;

const ChiTietPhieuNhapForm = ({
    initialValues,
    type,
    onSubmit,
    onDelete,
    loading
}: Props) => {
    const chiTietPhieuNhapForm = useForm<ChiTietPhieuNhapFormData>({
        initialValues: {
            maSanPham: type === 'update' ? initialValues.maSanPham : '',
            soLuongNhap: type === 'update' ? initialValues.soLuongNhap : 0,
            donGiaNhap: type === 'update' ? initialValues.donGiaNhap : 0,
        },
        validate: {
            maSanPham: (value) => value ? null : 'Vui lòng chọn sản phẩm',
            soLuongNhap: (value) => value > 0 ? null : 'Số lượng nhập phải lớn hơn 0',
            donGiaNhap: (value) => value >= 0 ? null : 'Vui lòng nhập đơn giá nhập'
        }
    });

    const [lock, setLock] = useState(type === 'update');

    const handleLock = () => {
        setLock(prev => !prev);
        if (type === 'update' && lock) {
            chiTietPhieuNhapForm.setValues({
                maSanPham: initialValues.maSanPham,
                soLuongNhap: initialValues.soLuongNhap,
                donGiaNhap: initialValues.donGiaNhap,
            });
        }
    };

    const submit = (values: ChiTietPhieuNhapFormData) => {
        onSubmit(values, () => chiTietPhieuNhapForm.reset());
    };

    return (
        <form onSubmit={chiTietPhieuNhapForm.onSubmit(submit)}>
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
                        error={chiTietPhieuNhapForm.errors.maSanPham}
                        maSanPham={chiTietPhieuNhapForm.values.maSanPham}
                        setMaSanPham={(maSanPham) =>
                            chiTietPhieuNhapForm.setFieldValue('maSanPham', maSanPham)
                        }
                    />
                }
                <NumberInput
                    label='Đơn giá nhập'
                    placeholder='Đơn giá nhập'
                    min={0}
                    {...chiTietPhieuNhapForm.getInputProps('donGiaNhap')}
                    disabled={lock}
                />
                <NumberInput
                    label='Số lượng nhập'
                    placeholder='Số lượng nhập'
                    min={0}
                    {...chiTietPhieuNhapForm.getInputProps('soLuongNhap')}
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
                            onClick={handleLock}
                            color='green'
                        >
                            {lock ? 'Sửa' : 'Hủy'}
                        </Button>
                    </>}
                    {type === 'create' && <Button
                        color='red'
                        onClick={() => chiTietPhieuNhapForm.reset()}
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

export default ChiTietPhieuNhapForm;