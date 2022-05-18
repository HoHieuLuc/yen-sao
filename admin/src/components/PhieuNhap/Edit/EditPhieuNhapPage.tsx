import { useParams } from 'react-router-dom';

import CreateChiTietPhieuNhap from '../Create/CreateChiTietPhieuNhap';
import { Box, Center, Divider, Grid, Title } from '@mantine/core';
import LoadingWrapper from '../../Utils/Wrappers/LoadingWrapper';
import EditChiTietPhieuNhap from './EditChiTietPhieuNhap';
import NotFound from '../../Utils/Errors/NotFound';
import EditPhieuNhap from './EditPhieuNhap';

import { phieuNhapHooks } from '../../../graphql/queries';
import { convertToVND } from '../../../utils/common';

const EditPhieuNhapPage = () => {
    const { id } = useParams();
    const { data, loading, error } = phieuNhapHooks.usePhieuNhapByID(id || '');

    if (error || !id || (data && data.phieuNhap && data.phieuNhap.byID === null)) {
        return <NotFound />;
    }

    return (
        <LoadingWrapper loading={loading}>
            {data && <Box>
                <Center mb='md'>
                    <Title>Chỉnh sửa phiếu nhập</Title>
                </Center>
                <Grid gutter={10} mb='sm' align='center'>
                    <Grid.Col span={4}>Ngày nhập:</Grid.Col>
                    <Grid.Col span={8}>
                        <EditPhieuNhap
                            phieuNhap={data.phieuNhap.byID}
                        />
                    </Grid.Col>
                    <Grid.Col span={4}>Người nhập:</Grid.Col>
                    <Grid.Col span={8}>
                        {data.phieuNhap.byID.nguoiNhap.username}
                    </Grid.Col>
                    <Grid.Col span={4}>Số mặt hàng nhập:</Grid.Col>
                    <Grid.Col span={8}>
                        {data.phieuNhap.byID.soMatHangNhap}
                    </Grid.Col>
                    <Grid.Col span={4}>Tổng tiền:</Grid.Col>
                    <Grid.Col span={8}>
                        {convertToVND(data.phieuNhap.byID.tongTien)}
                    </Grid.Col>
                </Grid>
                <Box>
                    {data.phieuNhap.byID.chiTiet.map(item => (
                        <Box
                            key={item.id}
                        >
                            <EditChiTietPhieuNhap
                                label={
                                    `${item.sanPham.tenSanPham} - 
                                    Số lượng nhập: ${item.soLuongNhap / 1000} kg`
                                }
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

export default EditPhieuNhapPage;