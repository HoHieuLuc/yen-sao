import { Button, NumberInput, SimpleGrid, Textarea } from '@mantine/core';
import SanPhamSelect from '../../SanPham/Form/SanPhamSelect';

import { FormList } from '@mantine/form/lib/form-list/form-list';
import { UseFormReturnType } from '@mantine/form/lib/use-form';
import { ChiTietPhieuNhapInput } from '../../../types';

interface Props {
    phieuNhapForm: UseFormReturnType<{
        ngayNhap: Date;
        payload: FormList<ChiTietPhieuNhapInput>;
    }>
    index: number;
}

const ChiTietPhieuNhapListForm = ({ phieuNhapForm, index }: Props) => {
    const maSanPham = phieuNhapForm.getListInputProps('payload', index, 'maSanPham');

    return (
        <SimpleGrid cols={1} spacing='xs'>
            <SanPhamSelect
                error={
                    phieuNhapForm.getListInputProps(
                        'payload',
                        index,
                        'maSanPham'
                    ).error
                }
                maSanPham={typeof maSanPham.value === 'string' ? maSanPham.value : ''}
                setMaSanPham={(maSanPham) =>
                    phieuNhapForm.getListInputProps(
                        'payload',
                        index,
                        'maSanPham'
                    ).onChange(maSanPham)
                }
            />
            <NumberInput
                label='Đơn giá nhập/100gram'
                placeholder='Đơn giá nhập'
                {...phieuNhapForm.getListInputProps('payload', index, 'donGiaNhap')}
                parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
                formatter={(value) =>
                    !Number.isNaN(parseFloat(value || 'a'))
                        ? (value || '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        : '0'
                }
                required
                min={0}
            />
            <NumberInput
                label='Số lượng nhập (kg)'
                placeholder='Số lượng nhập'
                {...phieuNhapForm.getListInputProps('payload', index, 'soLuongNhap')}
                precision={2}
                required
                min={0}
            />
            <Textarea
                label='Ghi chú'
                placeholder='Nhập ghi chú'
                {...phieuNhapForm.getListInputProps('payload', index, 'ghiChu')}
                autosize
            />
            <Button
                color='red'
                variant='light'
                onClick={() => phieuNhapForm.removeListItem('payload', index)}
            >
                Xóa
            </Button>
        </SimpleGrid>
    );
};

export default ChiTietPhieuNhapListForm;