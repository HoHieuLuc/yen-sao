import { useMutation } from '@apollo/client';
import { useForm } from '@mantine/form';

import { Button, Grid, TextInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';

import { showErrorNotification, showSuccessNotification } from '../../../events';
import { PhieuXuat, UpdatePhieuXuatInput } from '../../../types';
import { phieuXuatQuery } from '../../../graphql/queries';
import { convertToVND } from '../../../utils/common';

interface Props {
    phieuXuat: PhieuXuat;
}

const EditPhieuXuat = ({ phieuXuat }: Props) => {
    const [updatePhieuXuat, { loading }] = useMutation<
        never, UpdatePhieuXuatInput
    >(phieuXuatQuery.UPDATE, {
        onCompleted: () => showSuccessNotification('Cập nhật phiếu xuất thành công'),
        onError: (error) => showErrorNotification(error.message)
    });

    const updatePhieuXuatForm = useForm({
        initialValues: {
            ngayXuat: new Date(phieuXuat.ngayXuat),
            nguoiMua: phieuXuat.nguoiMua
        },
        validate: {
            ngayXuat: (value) => value ? null : 'Vui lòng nhập ngày xuất',
            nguoiMua: (value) => value ? null : 'Vui lòng nhập tên người mua'
        }
    });

    const handleUpdate = (values: typeof updatePhieuXuatForm.values) => {
        void updatePhieuXuat({
            variables: {
                id: phieuXuat.id,
                payload: values
            }
        });
    };

    return (
        <form onSubmit={updatePhieuXuatForm.onSubmit(handleUpdate)}>
            <Grid gutter={10} mb='sm' align='center'>
                <Grid.Col span={4}>Ngày xuất:</Grid.Col>
                <Grid.Col span={8}>
                    <DatePicker
                        {...updatePhieuXuatForm.getInputProps('ngayXuat')}
                        clearable={false}
                    />
                </Grid.Col>
                <Grid.Col span={4}>Người mua:</Grid.Col>
                <Grid.Col span={6}>
                    <TextInput
                        {...updatePhieuXuatForm.getInputProps('nguoiMua')}
                        placeholder='Nhập tên người mua'
                    />
                </Grid.Col>
                <Grid.Col span={2}>
                    <Button
                        type='submit'
                        loading={loading}
                        fullWidth
                    >
                        Xác nhận
                    </Button>
                </Grid.Col>
                <Grid.Col span={4}>Người xuất:</Grid.Col>
                <Grid.Col span={8}>
                    {phieuXuat.nguoiXuat.fullname}
                </Grid.Col>
                <Grid.Col span={4}>Số mặt hàng xuất:</Grid.Col>
                <Grid.Col span={8}>
                    {phieuXuat.soMatHangXuat}
                </Grid.Col>
                <Grid.Col span={4}>Tổng tiền:</Grid.Col>
                <Grid.Col span={8}>
                    {convertToVND(phieuXuat.tongTien)}
                </Grid.Col>
            </Grid>
        </form>
    );
};

export default EditPhieuXuat;