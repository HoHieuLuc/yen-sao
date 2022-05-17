import { Link, useNavigate, useParams } from 'react-router-dom';
import { useModals } from '@mantine/modals';
import { useQuery } from '@apollo/client';

import { Box, Button, Center, Grid, Group, Title } from '@mantine/core';
import LoadingWrapper from '../../Utils/Wrappers/LoadingWrapper';
import ChiTietPhieuXuatItem from './ChiTietPhieuXuatItem';
import DeletePhieuXuat from '../Delete/DeletePhieuXuat';
import NotFound from '../../Utils/Errors/NotFound';

import { convertToShortDate, convertToVND } from '../../../utils/common';
import { phieuXuatQuery } from '../../../graphql/queries';
import { PhieuXuat, PhieuXuatByID } from '../../../types';

const PhieuXuatDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { data, loading, error } = useQuery<
        PhieuXuatByID, { id: string }
    >(phieuXuatQuery.BY_ID, {
        variables: {
            id: id || ''
        }
    });

    const modals = useModals();

    const openDeleteModal = (phieuXuat: PhieuXuat) => {
        const modalId = modals.openModal({
            title: <h3>Xóa phiếu xuất</h3>,
            children: <DeletePhieuXuat
                phieuXuat={phieuXuat}
                closeModal={() => modals.closeModal(modalId)}
                callback={() => navigate('/phieu-xuat')}
            />
        });
    };

    if (error || !id || (data && data.phieuXuat && data.phieuXuat.byID === null)) {
        return <NotFound />;
    }

    return (
        <LoadingWrapper loading={loading}>
            {data && <Box>
                <Center mb='md'>
                    <Title>Chi tiết phiếu xuất</Title>
                </Center>
                <Grid gutter={10} mb='sm'>
                    <Grid.Col span={4}>Ngày xuất:</Grid.Col>
                    <Grid.Col span={8}>
                        {convertToShortDate(data.phieuXuat.byID.ngayXuat)}
                    </Grid.Col>
                    <Grid.Col span={4}>Người xuất:</Grid.Col>
                    <Grid.Col span={8}>
                        {data.phieuXuat.byID.nguoiXuat.fullname}
                    </Grid.Col>
                    <Grid.Col span={4}>Người mua:</Grid.Col>
                    <Grid.Col span={8}>
                        {data.phieuXuat.byID.nguoiMua}
                    </Grid.Col>
                    <Grid.Col span={4}>Số mặt hàng xuất:</Grid.Col>
                    <Grid.Col span={8}>
                        {data.phieuXuat.byID.soMatHangXuat}
                    </Grid.Col>
                    <Grid.Col span={4}>Tổng tiền:</Grid.Col>
                    <Grid.Col span={8}>
                        {convertToVND(data.phieuXuat.byID.tongTien)}
                    </Grid.Col>
                </Grid>
                {data.phieuXuat.byID.chiTiet.map((item, index) => (
                    <ChiTietPhieuXuatItem
                        key={item.id}
                        chiTietPhieuXuat={item}
                        index={index}
                    />
                ))}
                <Group position='right' mt='md'>
                    <Button color='red' onClick={() => openDeleteModal(data.phieuXuat.byID)}>
                        Xóa
                    </Button>
                    <Button color='teal' component={Link} to={`/phieu-xuat/${id}/sua`} >
                        Sửa
                    </Button>
                </Group>
            </Box>}
        </LoadingWrapper>
    );
};

export default PhieuXuatDetails;