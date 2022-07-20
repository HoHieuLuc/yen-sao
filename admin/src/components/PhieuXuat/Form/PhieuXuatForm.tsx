import { gql, useApolloClient } from '@apollo/client';
import { formList, useForm } from '@mantine/form';

import { Accordion, Button, Group, Stack, TextInput } from '@mantine/core';
import ChiTietPhieuXuatListForm from './ChiTietPhieuXuatListForm';
import { PlusIcon } from '../../Utils/Icons';
import { DatePicker } from '@mantine/dates';

import { ChiTietPhieuXuatInput, CreatePhieuXuatVars } from '../../../types';
import { showErrorNotification } from '../../../events';

interface Props {
    loading: boolean;
    onSubmit: (
        values: CreatePhieuXuatVars,
        callback: () => void
    ) => void;
}

const PhieuXuatForm = ({ loading, onSubmit }: Props) => {
    const phieuXuatForm = useForm({
        initialValues: {
            ngayXuat: new Date(),
            nguoiMua: '',
            payload: formList<ChiTietPhieuXuatInput>([{
                maSanPham: '',
                soLuongXuat: 0,
                donGiaXuat: 0,
                ghiChu: '',
                isCompleted: false
            }]),
        },
        validate: {
            ngayXuat: (value) => value ? null : 'Vui lòng nhập ngày xuất',
            nguoiMua: (value) => value ? null : 'Vui lòng nhập tên người mua',
            payload: {
                maSanPham: (value) => value ? null : 'Vui lòng chọn 1 sản phẩm',
                donGiaXuat: (value) => value >= 0 ? null : 'Giá xuất không hợp lệ',
                soLuongXuat: (value) => value > 0 ? null : 'Số lượng không hợp lệ',
            }
        }
    });

    const client = useApolloClient();
    const chiTietFormElements = phieuXuatForm.values.payload.map((phieuXuat, index) => {
        const sanPham = client.readFragment<{ tenSanPham: string }>({
            id: `SanPham:${phieuXuat.maSanPham}`,
            fragment: gql`
                fragment TenSanPham on SanPham {
                    tenSanPham
                }
            `
        });
        return (
            <Accordion.Item
                label={sanPham
                    ? `${sanPham.tenSanPham} - Số lượng xuất: ${phieuXuat.soLuongXuat || 0} kg`
                    : 'Chọn sản phẩm'}
                key={index}
            >
                <ChiTietPhieuXuatListForm
                    phieuXuatForm={phieuXuatForm}
                    index={index}
                />
            </Accordion.Item>
        );
    });

    const submit = (values: CreatePhieuXuatVars) => {
        if (phieuXuatForm.values.payload.length === 0) {
            return showErrorNotification('Vui lòng xuất ít nhất 1 sẩn phẩm');
        }
        onSubmit({
            ...values,
            payload: values.payload.map(item => ({
                ...item,
                soLuongXuat: item.soLuongXuat * 1000
            }))
        }, () => phieuXuatForm.reset());
    };

    return (
        <form onSubmit={phieuXuatForm.onSubmit(submit)} spellCheck={false}>
            <Stack spacing='xs'>
                <TextInput
                    label='Người mua'
                    placeholder='Nhập tên người mua'
                    {...phieuXuatForm.getInputProps('nguoiMua')}
                    required
                />
                <DatePicker
                    label='Ngày xuất'
                    {...phieuXuatForm.getInputProps('ngayXuat')}
                    clearable={false}
                    required
                />
                <Accordion multiple offsetIcon={false}>
                    {chiTietFormElements}
                </Accordion>
                <Group position='center'>
                    <Button
                        color='green'
                        onClick={() => phieuXuatForm.addListItem('payload',
                            {
                                maSanPham: '',
                                soLuongXuat: 0,
                                donGiaXuat: 0,
                                ghiChu: '',
                                isCompleted: false
                            })}
                        rightIcon={<PlusIcon />}
                    >
                        Thêm mới
                    </Button>
                    <Button
                        type='submit'
                        loading={loading}
                    >
                        Xác nhận
                    </Button>
                </Group>
            </Stack>
        </form>
    );
};

export default PhieuXuatForm;