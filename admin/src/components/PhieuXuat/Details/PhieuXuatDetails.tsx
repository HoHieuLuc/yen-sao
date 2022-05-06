import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { Box, Button, Center, Grid, Group, ScrollArea, Table, Title } from '@mantine/core';
import LoadingWrapper from '../../Utils/Wrappers/LoadingWrapper';
import ChiTietPhieuXuatItem from './ChiTietPhieuXuatItem';
import NotFound from '../../Utils/Errors/NotFound';

import { convertToVietnameseDate, convertToVND } from '../../../utils/common';
import { phieuXuatQuery } from '../../../graphql/queries';
import { PhieuXuatByID } from '../../../types';
import { useModals } from '@mantine/modals';
import { PhieuXuatDoc } from '../List/PhieuXuatList';
import DeletePhieuXuat from '../Delete/DeletePhieuXuat';

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

    const openDeleteModal = (phieuXuat: PhieuXuatDoc) => {
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