import ChiTietPhieuNhapItem from './ChiTietPhieuNhapItem';
import { Grid } from '@mantine/core';

import { convertToShortDate, convertToVND } from '../../../utils/common';
import { PhieuNhap } from '../../../types';

interface Props {
    data: PhieuNhap;
}

const PhieuNhapDetails = ({ data }: Props) => {
    return (
        <>
            <Grid gutter={10} mb='sm'>
                <Grid.Col span={4}>Ngày nhập:</Grid.Col>
                <Grid.Col span={8}>
                    {convertToShortDate(data.ngayNhap)}
                </Grid.Col>
                <Grid.Col span={4}>Người nhập:</Grid.Col>
                <Grid.Col span={8}>
                    {data.nguoiNhap.fullname}
                </Grid.Col>
                <Grid.Col span={4}>Số mặt hàng nhập:</Grid.Col>
                <Grid.Col span={8}>
                    {data.soMatHangNhap || data.chiTiet.length}
                </Grid.Col>
                <Grid.Col span={4}>Tổng tiền:</Grid.Col>
                <Grid.Col span={8}>
                    {convertToVND(data.tongTien)}
                </Grid.Col>
            </Grid>
            
            {data.chiTiet.map((item, index) => (
                <ChiTietPhieuNhapItem
                    key={item.id}
                    chiTietPhieuNhap={item}
                    index={index}
                />
            ))}
        </>
    );
};

export default PhieuNhapDetails;