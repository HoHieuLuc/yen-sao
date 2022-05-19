import ChiTietPhieuXuatItem from './ChiTietPhieuXuatItem';
import { Grid } from '@mantine/core';

import { convertToShortDate, convertToVND } from '../../../utils/common';
import { PhieuXuat } from '../../../types';

interface Props {
    data: PhieuXuat;
}

const PhieuXuatDetails = ({ data }: Props) => {
    return (
        <>
            <Grid gutter={10} mb='sm'>
                <Grid.Col span={4}>Ngày xuất:</Grid.Col>
                <Grid.Col span={8}>
                    {convertToShortDate(data.ngayXuat)}
                </Grid.Col>
                <Grid.Col span={4}>Người xuất:</Grid.Col>
                <Grid.Col span={8}>
                    {data.nguoiXuat.fullname}
                </Grid.Col>
                <Grid.Col span={4}>Người mua:</Grid.Col>
                <Grid.Col span={8}>
                    {data.nguoiMua}
                </Grid.Col>
                <Grid.Col span={4}>Số mặt hàng xuất:</Grid.Col>
                <Grid.Col span={8}>
                    {data.soMatHangXuat || data.chiTiet.length}
                </Grid.Col>
                <Grid.Col span={4}>Tổng tiền:</Grid.Col>
                <Grid.Col span={8}>
                    {convertToVND(data.tongTien)}
                </Grid.Col>
            </Grid>
            {data.chiTiet.map((item, index) => (
                <ChiTietPhieuXuatItem
                    key={item.id}
                    chiTietPhieuXuat={item}
                    index={index}
                />
            ))}
        </>
    );
};

export default PhieuXuatDetails;