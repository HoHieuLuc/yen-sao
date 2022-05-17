import { useMutation } from '@apollo/client';
import { useState } from 'react';

import { Button, Grid } from '@mantine/core';
import { DatePicker } from '@mantine/dates';

import { showErrorNotification, showSuccessNotification } from '../../../events';
import { PhieuNhap, UpdatePhieuNhapInput } from '../../../types';
import { phieuNhapQuery } from '../../../graphql/queries';

interface Props {
    phieuNhap: PhieuNhap;
}

const EditPhieuNhap = ({ phieuNhap }: Props) => {
    const [updatePhieuNhap, { loading }] = useMutation<
        never, UpdatePhieuNhapInput
    >(phieuNhapQuery.UPDATE, {
        onCompleted: () => showSuccessNotification('Cập nhật phiếu nhập thành công'),
        onError: (error) => showErrorNotification(error.message)
    });

    const [ngayNhap, setNgayNhap] = useState<Date | null>(
        new Date(phieuNhap.ngayNhap)
    );

    const handleUpdate = () => {
        if (!ngayNhap) {
            return;
        }
        void updatePhieuNhap({
            variables: {
                id: phieuNhap.id,
                payload: {
                    ngayNhap
                }
            }
        });
    };

    return (
        <Grid>
            <Grid.Col span={9}>
                <DatePicker
                    value={ngayNhap}
                    onChange={setNgayNhap}
                    clearable={false}
                />
            </Grid.Col>
            <Grid.Col span={3}>
                <Button
                    disabled={ngayNhap === null}
                    loading={loading}
                    onClick={handleUpdate}
                >
                    Xác nhận
                </Button>
            </Grid.Col>
        </Grid>
    );
};

export default EditPhieuNhap;