import { gql, useApolloClient } from '@apollo/client';
import { formList, useForm } from '@mantine/form';

import ChiTietPhieuXuatListForm from './ChiTietPhieuXuatListForm';
import { Accordion, Button, Group } from '@mantine/core';
import { PlusIcon } from '../../Utils/Icons';

import { ChiTietPhieuXuatFormData, PhieuXuatVars } from '../../../types';
import { showErrorNotification } from '../../../events';

interface Props {
    loading: boolean;
    handleSubmit: (
        values: PhieuXuatVars,
        callback: () => void
    ) => void;
}

const PhieuXuatForm = ({ loading, handleSubmit }: Props) => {
    const phieuXuatForm = useForm({
        initialValues: {
            payload: formList<ChiTietPhieuXuatFormData>([{
                maSanPham: '',
                soLuongXuat: 0,
                donGiaXuat: 0
            }])
        },
        validate: {
            payload: {
                maSanPham: (value) => value ? null : 'Vui lòng chọn 1 sản phẩm',
                donGiaXuat: (value) => value >= 0 ? null : 'Giá xuất không hợp lệ',
                soLuongXuat: (value) => value >= 1 ? null : 'Số lượng không hợp lệ',
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
                    ? `${sanPham.tenSanPham} - Số lượng xuất: ${phieuXuat.soLuongXuat || 0}`
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

    const submit = (values: PhieuXuatVars) => {
        if (phieuXuatForm.values.payload.length === 0) {
            return showErrorNotification('Vui lòng nhập ít nhất 1 chi tiết phiếu xuất');
        }
        handleSubmit(values, () => phieuXuatForm.reset());
    };

    return (
        <form onSubmit={phieuXuatForm.onSubmit(submit)}>
            <Accordion multiple offsetIcon={false}>
                {chiTietFormElements}
            </Accordion>
            <Group position='center' mt='md'>
                <Button
                    color='green'
                    onClick={() => phieuXuatForm.addListItem('payload',
                        {
                            maSanPham: '',
                            soLuongXuat: 0,
                            donGiaXuat: 0
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

export default PhieuXuatForm;