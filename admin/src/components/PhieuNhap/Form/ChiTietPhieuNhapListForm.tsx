import { Button, NumberInput, SimpleGrid, Switch, Textarea } from '@mantine/core';
import SanPhamSelect from '../../SanPham/Form/SanPhamSelect';

import { FormList } from '@mantine/form/lib/form-list/form-list';
import { UseFormReturnType } from '@mantine/form/lib/use-form';
import { ChiTietPhieuNhapInput } from '../../../types';
import CurrencyInput from '../../Utils/Input/CurrencyInput';

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
            <CurrencyInput
                label='Đơn giá nhập/100gram'
                placeholder='Đơn giá nhập'
                {...phieuNhapForm.getListInputProps('payload', index, 'donGiaNhap')}
                required
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
            <Switch
                label='Đã nhập? (chỉ những sản phẩm đã nhập thì số lượng tồn mới được cập nhật)'
                {...phieuNhapForm.getListInputProps('payload', index, 'isCompleted')}
                checked={phieuNhapForm.values.payload[index].isCompleted}
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