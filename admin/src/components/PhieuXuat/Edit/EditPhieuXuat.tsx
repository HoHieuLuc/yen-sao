import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { Anchor, Box, Center, Divider, Grid, Title } from '@mantine/core';
import CreateChiTietPhieuXuat from '../Create/CreateChiTietPhieuXuat';
import LoadingWrapper from '../../Utils/Wrappers/LoadingWrapper';
import EditChiTietPhieuXuat from './EditChiTietPhieuXuat';
import NotFound from '../../Utils/Errors/NotFound';

import { convertToVietnameseDate, convertToVND } from '../../../utils/common';
import { phieuXuatQuery } from '../../../graphql/queries';
import { PhieuXuatByID } from '../../../types';

const EditPhieuXuat = () => {
    const { id } = useParams();
    const { data, loading, error } = useQuery<
        PhieuXuatByID, { id: string }
    >(phieuXuatQuery.BY_ID, {
        variables: {
            id: id || ''
        }
    });

    if (error || !id || (data && data.phieuXuat && data.phieuXuat.byID === null)) {
        return <NotFound />;
    }

    return (
        <LoadingWrapper loading={loading}>
            {data && <Box>
                <Center mb='md'>
                    <Title>Chỉnh sửa phiếu xuất</Title>
                </Center>
                <Grid gutter={10} mb='sm'>
                    <Grid.Col xs={6}>Ngày xuất:</Grid.Col>
                    <Grid.Col xs={6}>
                        <Anchor component={Link} to={`/phieu-xuat/${id}`}>
                            {convertToVietnameseDate(data.phieuXuat.byID.createdAt)}
                        </Anchor>
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
                <Box>
                    {data.phieuXuat.byID.chiTiet.map(item => (
                        <Box key={item.id}>
                            <EditChiTietPhieuXuat
                                label={
                                    `${item.sanPham.tenSanPham} - Số lượng xuất: ${item.soLuongXuat}`
                                }
                                idPhieuXuat={id}
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
                        <CreateChiTietPhieuXuat
                            label='Thêm sản phẩm mới vào phiếu xuất'
                            idPhieuXuat={id}
                        />
                    </Box>
                </Box>
            </Box>}
        </LoadingWrapper>
    );
};

export default EditPhieuXuat;