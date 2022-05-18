import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDocumentTitle } from '@mantine/hooks';
import { useModals } from '@mantine/modals';

import { Box, Button, Center, Grid, Group, Title } from '@mantine/core';
import LoadingWrapper from '../../Utils/Wrappers/LoadingWrapper';
import ChiTietPhieuNhapItem from './ChiTietPhieuNhapItem';
import DeletePhieuNhap from '../Delete/DeletePhieuNhap';
import NotFound from '../../Utils/Errors/NotFound';

import { convertToShortDate, convertToVND } from '../../../utils/common';
import { phieuNhapHooks } from '../../../graphql/queries';
import { PhieuNhap } from '../../../types';

const PhieuNhapDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { data, loading, error } = phieuNhapHooks.usePhieuNhapByID(id || '');
    useDocumentTitle(
        data && data.phieuNhap.byID
            ? `Phiếu nhập ngày ${convertToShortDate(data.phieuNhap.byID.ngayNhap)}`
            : 'Đang tải...'
    );

    const modals = useModals();

    const openDeleteModal = (phieuNhap: PhieuNhap) => {
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
                    <Grid.Col span={4}>Ngày nhập:</Grid.Col>
                    <Grid.Col span={8}>
                        {convertToShortDate(data.phieuNhap.byID.ngayNhap)}
                    </Grid.Col>
                    <Grid.Col span={4}>Người nhập:</Grid.Col>
                    <Grid.Col span={8}>
                        {data.phieuNhap.byID.nguoiNhap.fullname}
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

                {data.phieuNhap.byID.chiTiet.map((item, index) => (
                    <ChiTietPhieuNhapItem
                        key={item.id}
                        chiTietPhieuNhap={item}
                        index={index}
                    />
                ))}

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