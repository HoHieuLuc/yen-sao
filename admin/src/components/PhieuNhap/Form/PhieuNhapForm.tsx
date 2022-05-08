import { gql, useApolloClient } from '@apollo/client';
import { formList, useForm } from '@mantine/form';

import ChiTietPhieuNhapListForm from './ChiTietPhieuNhapListForm';
import { Accordion, Button, Group } from '@mantine/core';
import { PlusIcon } from '../../Utils/Icons';

import { ChiTietPhieuNhapFormData, PhieuNhapVars } from '../../../types';
import { showErrorNotification } from '../../../events';

interface Props {
    loading: boolean;
    handleSubmit: (
        values: PhieuNhapVars,
        callback: () => void
    ) => void;
}

const PhieuNhapForm = ({ loading, handleSubmit }: Props) => {
    const phieuNhapForm = useForm({
        initialValues: {
            payload: formList<ChiTietPhieuNhapFormData>([{
                maSanPham: '',
                soLuongNhap: 0,
                donGiaNhap: 0
            }])
        },
        validate: {
            payload: {
                maSanPham: (value) => value ? null : 'Vui lòng chọn 1 sản phẩm',
                donGiaNhap: (value) => value >= 0 ? null : 'Giá nhập không hợp lệ',
                soLuongNhap: (value) => value >= 1 ? null : 'Số lượng không hợp lệ',
            }
        }
    });

    const client = useApolloClient();
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
                    ? `${sanPham.tenSanPham} - Số lượng nhập: ${phieuNhap.soLuongNhap || 0}`
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

    const submit = (values: PhieuNhapVars) => {
        if (phieuNhapForm.values.payload.length === 0) {
            return showErrorNotification('Vui lòng nhập ít nhất 1 chi tiết phiếu nhập');
        }
        handleSubmit(values, () => phieuNhapForm.reset());
    };

    return (
        <form onSubmit={phieuNhapForm.onSubmit(submit)}>
            <Accordion multiple offsetIcon={false}>
                {chiTietFormElements}
            </Accordion>
            <Group position='center' mt='md'>
                <Button
                    color='green'
                    onClick={() => phieuNhapForm.addListItem('payload',
                        {
                            maSanPham: '',
                            soLuongNhap: 0,
                            donGiaNhap: 0
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
        </form>
    );
};

export default PhieuNhapForm;