import { useParams, Link, useNavigate } from 'react-router-dom';
import { useModals } from '@mantine/modals';
import { useQuery } from '@apollo/client';

import { Box, Button, Center, Grid, Group, ScrollArea, Table, Title } from '@mantine/core';
import LoadingWrapper from '../../Utils/Wrappers/LoadingWrapper';
import ChiTietPhieuNhapItem from './ChiTietPhieuNhapItem';
import DeletePhieuNhap from '../Delete/DeletePhieuNhap';
import NotFound from '../../Utils/Errors/NotFound';

import { convertToVietnameseDate, convertToVND } from '../../../utils/common';
import { phieuNhapQuery } from '../../../graphql/queries';
import { PhieuNhapDoc } from '../List/PhieuNhapList';
import { PhieuNhapByID } from '../../../types';

const PhieuNhapDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { data, loading, error } = useQuery<
        PhieuNhapByID, { id: string }
    >(phieuNhapQuery.BY_ID, {
        variables: {
            id: id || ''
        }
    });

    const modals = useModals();

    const openDeleteModal = (phieuNhap: PhieuNhapDoc) => {
        const modalId = modals.openModal({
            title: <h3>Xóa phiếu nhập</h3>,
            children: <DeletePhieuNhap
                phieuNhap={phieuNhap}
                closeModal={() => modals.closeModal(modalId)}
                callback={() => navigate('/phieu-nhap')}
            />
        });
    };

    if (error || !id || (data && data.phieuNhap && data.phieuNhap.byID === null)) {
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
                <Group position='right' mt='md'>
                    <Button color='red' onClick={() => openDeleteModal(data.phieuNhap.byID)}>
                        Xóa
                    </Button>
                    <Button color='teal' component={Link} to={`/phieu-nhap/${id}/sua`} >
                        Sửa
                    </Button>
                </Group>
            </Box>}
        </LoadingWrapper>
    );
};

export default PhieuNhapDetails;