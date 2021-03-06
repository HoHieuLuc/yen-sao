import { useEffect, useState } from 'react';
import { useForm } from '@mantine/form';

import { Button, NumberInput, Select, SimpleGrid, Switch, Textarea } from '@mantine/core';
import SanPhamSelect from '../../SanPham/Form/SanPhamSelect';
import CurrencyInput from '../../Utils/Input/CurrencyInput';

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
            ghiChu: type === 'update' ? initialValues.ghiChu : '',
            isCompleted: type === 'update' ? initialValues.isCompleted : false
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
            chiTietPhieuXuatForm.reset();
        }
    }, [lock]);

    const submit = (values: ChiTietPhieuXuatInput) => {
        onSubmit({
            ...values,
            soLuongXuat: values.soLuongXuat * 1000
        }, () => chiTietPhieuXuatForm.reset());
    };

    return (
        <form onSubmit={chiTietPhieuXuatForm.onSubmit(submit)} spellCheck={false}>
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
                <CurrencyInput
                    label='Đơn giá xuất/100gram'
                    placeholder='Đơn giá xuất'
                    {...chiTietPhieuXuatForm.getInputProps('donGiaXuat')}
                    disabled={lock}
                    required
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
                <Switch
                    label='Đã xuất? (chỉ những sản phẩm đã xuất thì số lượng tồn mới được cập nhật)'
                    {...chiTietPhieuXuatForm.getInputProps('isCompleted')}
                    checked={chiTietPhieuXuatForm.values.isCompleted}
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
                            color={lock ? 'green' : 'red'}
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