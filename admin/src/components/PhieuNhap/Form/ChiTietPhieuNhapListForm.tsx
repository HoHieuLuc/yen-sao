import { Button, NumberInput, SimpleGrid } from '@mantine/core';
import SanPhamSelect from '../../SanPham/Form/SanPhamSelect';

import { FormList } from '@mantine/form/lib/form-list/form-list';
import { UseFormReturnType } from '@mantine/form/lib/use-form';
import { ChiTietPhieuNhapFormData } from '../../../types';

interface Props {
    phieuNhapForm: UseFormReturnType<{
        payload: FormList<ChiTietPhieuNhapFormData>;
    }>
    index: number;
}

const ChiTietPhieuNhapListForm = ({ phieuNhapForm, index }: Props) => {
    const maSanPham = phieuNhapForm.getListInputProps('payload', index, 'maSanPham');

    return (
        <SimpleGrid cols={1} spacing='xs'>
            <SanPhamSelect
                error={phieuNhapForm.getListInputProps('payload', index, 'maSanPham').error}
                maSanPham={typeof maSanPham.value === 'string' ? maSanPham.value : ''}
                setMaSanPham={(maSanPham) =>
                    phieuNhapForm.getListInputProps('payload', index, 'maSanPham').onChange(maSanPham)
                }
            />
            <NumberInput
                label='Đơn giá nhập'
                placeholder='Đơn giá nhập'
                min={0}
                required
                {...phieuNhapForm.getListInputProps('payload', index, 'donGiaNhap')}
            />
            <NumberInput
                label='Số lượng nhập'
                placeholder='Số lượng nhập'
                min={0}
                required
                {...phieuNhapForm.getListInputProps('payload', index, 'soLuongNhap')}
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