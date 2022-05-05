import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { Box, Center, Grid, ScrollArea, Table, Title } from '@mantine/core';
import LoadingWrapper from '../../Utils/Wrappers/LoadingWrapper';
import ChiTietPhieuXuatItem from './ChiTietPhieuXuatItem';
import NotFound from '../../Utils/Errors/NotFound';

import { convertToVietnameseDate, convertToVND } from '../../../utils/common';
import { phieuXuatQuery } from '../../../graphql/queries';
import { PhieuXuatByID } from '../../../types';

const PhieuXuatDetails = () => {
    const { id } = useParams();
    const { data, loading, error } = useQuery<
        PhieuXuatByID, { id: string }
    >(phieuXuatQuery.BY_ID, {
        variables: {
            id: id || ''
        }
    });

    if (error || (data && data.phieuXuat && data.phieuXuat.byID === null)) {
        return <NotFound />;
    }

    return (
        <LoadingWrapper loading={loading}>
            {data && <Box>
                <Center mb='md'>
                    <Title>Chi tiết phiếu xuất</Title>
                </Center>
                <Grid gutter={10} mb='sm'>
                    <Grid.Col xs={6}>Ngày xuất:</Grid.Col>
                    <Grid.Col xs={6}>
                        {convertToVietnameseDate(data.phieuXuat.byID.createdAt)}
                    </Grid.Col>
                    <Grid.Col xs={6}>Người xuất:</Grid.Col>
                    <Grid.Col xs={6}>
                        {data.phieuXuat.byID.nguoiXuat.username}
                    </Grid.Col>
                    <Grid.Col xs={6}>Số mặt hàng xuất:</Grid.Col>
                    <Grid.Col xs={6}>
                        {data.phieuXuat.byID.soMatHangXuat}
                    </Grid.Col>
                    <Grid.Col xs={6}>Tổng tiền:</Grid.Col>
                    <Grid.Col xs={6}>
                        {convertToVND(data.phieuXuat.byID.tongTien)}
                    </Grid.Col>
                </Grid>
                <ScrollArea style={{ whiteSpace: 'break-spaces' }}>
                    <Table striped highlightOnHover>
                        <thead>
                            <tr style={{ whiteSpace: 'nowrap' }}>
                                <th>STT</th>
                                <th>Tên sản phẩm</th>
                                <th>Số lượng xuất</th>
                                <th>Đơn giá xuất</th>
                                <th>Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.phieuXuat.byID.chiTiet.map((item, index) => (
                                <ChiTietPhieuXuatItem
                                    key={item.id}
                                    chiTietPhieuXuat={item}
                                    index={index}
                                />
                            ))}
                        </tbody>
                    </Table>
                </ScrollArea>
            </Box>}
        </LoadingWrapper>
    );
};

export default PhieuXuatDetails;