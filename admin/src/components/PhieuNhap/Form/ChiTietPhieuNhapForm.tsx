import { useEffect, useState } from 'react';
import { useForm } from '@mantine/form';

import { Button, NumberInput, Select, SimpleGrid, Textarea } from '@mantine/core';
import SanPhamSelect from '../../SanPham/Form/SanPhamSelect';

import { ChiTietPhieuNhapInput } from '../../../types';

interface BaseProps {
    type: 'create' | 'update';
    initialValues?: unknown;
    onSubmit: (
        values: ChiTietPhieuNhapInput,
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
    } & ChiTietPhieuNhapInput;
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
    const chiTietPhieuNhapForm = useForm<ChiTietPhieuNhapInput>({
        initialValues: {
            maSanPham: type === 'update' ? initialValues.maSanPham : '',
            soLuongNhap: type === 'update' ? initialValues.soLuongNhap / 1000 : 0,
            donGiaNhap: type === 'update' ? initialValues.donGiaNhap : 0,
            ghiChu: type === 'update' ? initialValues.ghiChu : ''
        },
        validate: {
            maSanPham: (value) => value ? null : 'Vui lòng chọn sản phẩm',
            soLuongNhap: (value) => value > 0 ? null : 'Số lượng nhập phải lớn hơn 0',
            donGiaNhap: (value) => value >= 0 ? null : 'Vui lòng nhập đơn giá nhập'
        }
    });

    const [lock, setLock] = useState(type === 'update');

    useEffect(() => {
        // khi lock phiếu đang update thì reset lại giá trị ban đầu
        if (type === 'update' && lock) {
            chiTietPhieuNhapForm.reset();
        }
    }, [lock]);

    const submit = (values: ChiTietPhieuNhapInput) => {
        onSubmit({
            ...values,
            soLuongNhap: values.soLuongNhap * 1000
        }, () => chiTietPhieuNhapForm.reset());
    };

    return (
        <form onSubmit={chiTietPhieuNhapForm.onSubmit(submit)}>
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
                        error={chiTietPhieuNhapForm.errors.maSanPham}
                        maSanPham={chiTietPhieuNhapForm.values.maSanPham}
                        setMaSanPham={(maSanPham) =>
                            chiTietPhieuNhapForm.setFieldValue('maSanPham', maSanPham)
                        }
                    />
                }
                <NumberInput
                    label='Đơn giá nhập/100gram'
                    placeholder='Đơn giá nhập'
                    {...chiTietPhieuNhapForm.getInputProps('donGiaNhap')}
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
                    label='Số lượng nhập (kg)'
                    placeholder='Số lượng nhập'
                    {...chiTietPhieuNhapForm.getInputProps('soLuongNhap')}
                    disabled={lock}
                    precision={2}
                    required
                    min={0}
                />
                <Textarea
                    label='Ghi chú'
                    placeholder='Nhập ghi chú'
                    value={chiTietPhieuNhapForm.values.ghiChu || ''}
                    onChange={(e) =>
                        chiTietPhieuNhapForm.setFieldValue('ghiChu', e.target.value)
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
                            color= {lock ? 'green' : 'red'}
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
        </form >
    );
};

export default ChiTietPhieuNhapForm;