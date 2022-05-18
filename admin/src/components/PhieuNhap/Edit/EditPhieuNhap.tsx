import { useState } from 'react';

import { Button, Grid } from '@mantine/core';
import { DatePicker } from '@mantine/dates';

import { phieuNhapHooks } from '../../../graphql/queries';
import { PhieuNhap } from '../../../types';

interface Props {
    phieuNhap: PhieuNhap;
}

const EditPhieuNhap = ({ phieuNhap }: Props) => {
    const [updatePhieuNhap, { loading }] = phieuNhapHooks.useUpdatePhieuNhap();

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