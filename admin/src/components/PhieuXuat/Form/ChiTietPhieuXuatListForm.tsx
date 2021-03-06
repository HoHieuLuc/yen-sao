import { Button, NumberInput, SimpleGrid, Switch, Textarea } from '@mantine/core';
import SanPhamSelect from '../../SanPham/Form/SanPhamSelect';

import { FormList } from '@mantine/form/lib/form-list/form-list';
import { UseFormReturnType } from '@mantine/form/lib/use-form';
import { ChiTietPhieuXuatInput } from '../../../types';
import CurrencyInput from '../../Utils/Input/CurrencyInput';

interface Props {
    phieuXuatForm: UseFormReturnType<{
        ngayXuat: Date;
        nguoiMua: string;
        payload: FormList<ChiTietPhieuXuatInput>;
    }>
    index: number;
}

const ChiTietPhieuXuatListForm = ({ phieuXuatForm, index }: Props) => {
    const maSanPham = phieuXuatForm.getListInputProps('payload', index, 'maSanPham');

    return (
        <SimpleGrid cols={1} spacing='xs'>
            <SanPhamSelect
                error={
                    phieuXuatForm.getListInputProps(
                        'payload',
                        index,
                        'maSanPham').error
                }
                maSanPham={typeof maSanPham.value === 'string' ? maSanPham.value : ''}
                setMaSanPham={(maSanPham) =>
                    phieuXuatForm.getListInputProps(
                        'payload',
                        index,
                        'maSanPham'
                    ).onChange(maSanPham)
                }
            />
            <CurrencyInput
                label='Đơn giá xuất/100gram'
                placeholder='Đơn giá xuất'
                {...phieuXuatForm.getListInputProps('payload', index, 'donGiaXuat')}
                required
            />
            <NumberInput
                label='Số lượng xuất (kg)'
                placeholder='Số lượng xuất'
                {...phieuXuatForm.getListInputProps('payload', index, 'soLuongXuat')}
                precision={2}
                required
                min={0}
            />
            <Textarea
                label='Ghi chú'
                placeholder='Nhập ghi chú'
                {...phieuXuatForm.getListInputProps('payload', index, 'ghiChu')}
                autosize
            />
            <Switch
                label='Đã xuất? (chỉ những sản phẩm đã xuất thì số lượng tồn mới được cập nhật)'
                {...phieuXuatForm.getListInputProps('payload', index, 'isCompleted')}
                checked={phieuXuatForm.values.payload[index].isCompleted}
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