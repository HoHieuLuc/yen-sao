import { useQuery } from '@apollo/client';
import { Accordion, Box, Center, Grid, Title } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { phieuNhapQuery } from '../../../graphql/queries';
import { PhieuNhapByID } from '../../../types';
import { convertToVietnameseDate, convertToVND } from '../../../utils/common';
import NotFound from '../../Utils/Errors/NotFound';
import LoadingWrapper from '../../Utils/Wrappers/LoadingWrapper';
import CreateChiTietPhieuNhap from '../Create/CreateChiTietPhieuNhap';
import EditChiTietPhieuNhap from './EditChiTietPhieuNhap';

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
                <Accordion multiple offsetIcon={false}>
                    {data.phieuNhap.byID.chiTiet.map(item => (
                        <Accordion.Item
                            key={item.id}
                            label={`${item.sanPham.tenSanPham} - Số lượng nhập: ${item.soLuongNhap}`}
                        >
                            <EditChiTietPhieuNhap
                                idPhieuNhap={id}
                                idChiTiet={item.id}
                                initialValues={{
                                    tenSanPham: item.sanPham.tenSanPham,
                                    maSanPham: item.sanPham.id,
                                    soLuongTon: item.sanPham.soLuong,
                                    ...item,
                                }}
                            />
                        </Accordion.Item>
                    ))}
                    <Accordion.Item label='Thêm sản phẩm mới vào phiếu nhập'>
                        <CreateChiTietPhieuNhap 
                            idPhieuNhap={id}
                        />
                    </Accordion.Item>
                </Accordion>
            </Box>}
        </LoadingWrapper>
    );
};

export default EditPhieuNhap;