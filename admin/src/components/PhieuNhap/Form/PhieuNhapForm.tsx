import { gql, useApolloClient } from '@apollo/client';
import { formList, useForm } from '@mantine/form';

import ChiTietPhieuNhapListForm from './ChiTietPhieuNhapListForm';
import { Accordion, Button, Group, Stack } from '@mantine/core';
import { PlusIcon } from '../../Utils/Icons';
import { DatePicker } from '@mantine/dates';

import { ChiTietPhieuNhapInput, CreatePhieuNhapVars } from '../../../types';
import { showErrorNotification } from '../../../events';

interface Props {
    loading: boolean;
    onSubmit: (
        values: CreatePhieuNhapVars,
        callback: () => void
    ) => void;
}

const PhieuNhapForm = ({ loading, onSubmit }: Props) => {
    const client = useApolloClient();
    const phieuNhapForm = useForm({
        initialValues: {
            ngayNhap: new Date(),
            payload: formList<ChiTietPhieuNhapInput>([{
                maSanPham: '',
                soLuongNhap: 0,
                donGiaNhap: 0,
                ghiChu: '',
                isCompleted: false
            }])
        },
        validate: {
            ngayNhap: (value) => value ? null : 'Vui lòng chọn ngày nhập',
            payload: {
                maSanPham: (value) => value ? null : 'Vui lòng chọn 1 sản phẩm',
                donGiaNhap: (value) => value >= 0 ? null : 'Giá nhập không hợp lệ',
                soLuongNhap: (value) => value > 0 ? null : 'Số lượng không hợp lệ',
            },
        }
    });

    const chiTietFormElements = phieuNhapForm.values.payload.map((phieuNhap, index) => {
        const sanPham = client.readFragment<{ tenSanPham: string }>({
            id: `SanPham:${phieuNhap.maSanPham}`,
            fragment: gql`
                fragment TenSanPham on SanPham {
                    tenSanPham
                }
            `
        });

        return (
            <Accordion.Item
                label={sanPham
                    ? `${sanPham.tenSanPham} - Số lượng nhập: ${phieuNhap.soLuongNhap || 0} kg`
                    : 'Chọn sản phẩm'}
                key={index}
            >
                <ChiTietPhieuNhapListForm
                    phieuNhapForm={phieuNhapForm}
                    index={index}
                />
            </Accordion.Item>
        );
    });

    const submit = (values: CreatePhieuNhapVars) => {
        if (phieuNhapForm.values.payload.length === 0) {
            return showErrorNotification('Vui lòng nhập ít nhất 1 sản phẩm');
        }
        onSubmit({
            ...values,
            payload: values.payload.map(item => ({
                ...item,
                soLuongNhap: item.soLuongNhap * 1000
            })),
        }, () => phieuNhapForm.reset());
    };

    return (
        <form onSubmit={phieuNhapForm.onSubmit(submit)} spellCheck={false}>
            <Stack spacing='xs'>
                <DatePicker
                    label='Ngày nhập'
                    {...phieuNhapForm.getInputProps('ngayNhap')}
                    defaultValue={new Date()}
                    required
                />
                <Accordion multiple offsetIcon={false}>
                    {chiTietFormElements}
                </Accordion>
                <Group position='center'>
                    <Button
                        color='green'
                        onClick={() => phieuNhapForm.addListItem('payload',
                            {
                                maSanPham: '',
                                soLuongNhap: 0,
                                donGiaNhap: 0,
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

export default PhieuNhapForm;