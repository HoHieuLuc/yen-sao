import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import CreateChiTietPhieuNhap from '../Create/CreateChiTietPhieuNhap';
import { Box, Center, Divider, Grid, Title } from '@mantine/core';
import LoadingWrapper from '../../Utils/Wrappers/LoadingWrapper';
import EditChiTietPhieuNhap from './EditChiTietPhieuNhap';
import NotFound from '../../Utils/Errors/NotFound';

import { convertToVietnameseDate, convertToVND } from '../../../utils/common';
import { phieuNhapQuery } from '../../../graphql/queries';
import { PhieuNhapByID } from '../../../types';

const EditPhieuNhap = () => {
    const { id } = useParams();
    const { data, loading, error } = useQuery<
        PhieuNhapByID, { id: string }
    >(phieuNhapQuery.BY_ID, {
        variables: {
            id: id || ''
        }
    });

    if (error || !id || (data && data.phieuNhap && data.phieuNhap.byID === null)) {
        return <NotFound />;
    }

    return (
        <LoadingWrapper loading={loading}>
            {data && <Box>
                <Center mb='md'>
                    <Title>Chỉnh sửa phiếu nhập</Title>
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
                <Box>
                    {data.phieuNhap.byID.chiTiet.map(item => (
                        <Box
                            key={item.id}
                        >
                            <EditChiTietPhieuNhap
                                label={`${item.sanPham.tenSanPham} - Số lượng nhập: ${item.soLuongNhap}`}
                                idPhieuNhap={id}
                                idChiTiet={item.id}
                                initialValues={{
                                    tenSanPham: item.sanPham.tenSanPham,
                                    maSanPham: item.sanPham.id,
                                    soLuongTon: item.sanPham.soLuong,
                                    ...item,
                                }}
                            />
                            <Divider />
                        </Box>
                    ))}
                    <Box>
                        <CreateChiTietPhieuNhap
                            label='Thêm sản phẩm mới vào phiếu nhập'
                            idPhieuNhap={id}
                        />
                    </Box>
                </Box>
            </Box>}
        </LoadingWrapper>
    );
};

export default EditPhieuNhap;