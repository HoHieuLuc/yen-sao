import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { Box, Center, Grid, ScrollArea, Table, Title } from '@mantine/core';
import { PhieuNhapByID } from '../../../types';
import NotFound from '../../Utils/Errors/NotFound';
import LoadingWrapper from '../../Utils/Wrappers/LoadingWrapper';

import { convertToVietnameseDate, convertToVND } from '../../../utils/common';
import { phieuNhapQuery } from '../../../graphql/queries';
import ChiTietPhieuNhapItem from './ChiTietPhieuNhapItem';

const PhieuNhapDetails = () => {
    const { id } = useParams();
    const { data, loading, error } = useQuery<
        PhieuNhapByID, { id: string }
    >(phieuNhapQuery.BY_ID, {
        variables: {
            id: id || ''
        }
    });

    if (error || (data && data.phieuNhap && data.phieuNhap.byID === null)) {
        return <NotFound />;
    }

    return (
        <LoadingWrapper loading={loading}>
            {data && <Box>
                <Center mb='md'>
                    <Title>Chi tiết phiếu nhập</Title>
                </Center>
                <Grid gutter={10} mb='sm'>
                    <Grid.Col xs={6}>Ngày nhập:</Grid.Col>
                    <Grid.Col xs={6}>
                        {convertToVietnameseDate(data.phieuNhap.byID.createdAt)}
                    </Grid.Col>
                    <Grid.Col xs={6}>Người nhập:</Grid.Col>
                    <Grid.Col xs={6}>
                        {data.phieuNhap.byID.nguoiNhap.username}
                    </Grid.Col>
                    <Grid.Col xs={6}>Số mặt hàng nhập:</Grid.Col>
                    <Grid.Col xs={6}>
                        {data.phieuNhap.byID.soMatHangNhap}
                    </Grid.Col>
                    <Grid.Col xs={6}>Tổng tiền:</Grid.Col>
                    <Grid.Col xs={6}>
                        {convertToVND(data.phieuNhap.byID.tongTien)}
                    </Grid.Col>
                </Grid>
                <ScrollArea style={{ whiteSpace: 'break-spaces' }}>
                    <Table striped highlightOnHover>
                        <thead>
                            <tr style={{ whiteSpace: 'nowrap' }}>
                                <th>STT</th>
                                <th>Tên sản phẩm</th>
                                <th>Số lượng nhập</th>
                                <th>Đơn giá nhập</th>
                                <th>Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.phieuNhap.byID.chiTiet.map((item, index) => (
                                <ChiTietPhieuNhapItem
                                    key={item.id}
                                    chiTietPhieuNhap={item}
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

export default PhieuNhapDetails;