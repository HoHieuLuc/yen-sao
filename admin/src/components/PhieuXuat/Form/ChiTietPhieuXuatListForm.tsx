import { Button, NumberInput, SimpleGrid } from '@mantine/core';
import SanPhamSelect from '../../SanPham/Form/SanPhamSelect';

import { FormList } from '@mantine/form/lib/form-list/form-list';
import { UseFormReturnType } from '@mantine/form/lib/use-form';
import { ChiTietPhieuXuatFormData } from '../../../types';

interface Props {
    phieuXuatForm: UseFormReturnType<{
        payload: FormList<ChiTietPhieuXuatFormData>;
    }>
    index: number;
}

const ChiTietPhieuXuatListForm = ({ phieuXuatForm, index }: Props) => {
    const maSanPham = phieuXuatForm.getListInputProps('payload', index, 'maSanPham');

    return (
        <SimpleGrid cols={1} spacing='xs'>
            <SanPhamSelect
                error={phieuXuatForm.getListInputProps('payload', index, 'maSanPham').error}
                maSanPham={typeof maSanPham.value === 'string' ? maSanPham.value : ''}
                setMaSanPham={(maSanPham) =>
                    phieuXuatForm.getListInputProps('payload', index, 'maSanPham').onChange(maSanPham)
                }
            />
            <NumberInput
                label='Đơn giá xuất'
                placeholder='Đơn giá xuất'
                min={0}
                required
                {...phieuXuatForm.getListInputProps('payload', index, 'donGiaXuat')}
            />
            <NumberInput
                label='Số lượng xuất'
                placeholder='Số lượng xuất'
                min={0}
                required
                {...phieuXuatForm.getListInputProps('payload', index, 'soLuongXuat')}
            />
            <Button
                color='red'
                variant='light'
                onClick={() => phieuXuatForm.removeListItem('payload', index)}
            >
                Xóa
            </Button>
        </SimpleGrid>
    );
};

export default ChiTietPhieuXuatListForm;