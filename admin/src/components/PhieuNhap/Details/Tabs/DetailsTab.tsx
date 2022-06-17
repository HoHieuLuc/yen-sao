import { Box, Button, Center, Group, Title } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { Link, useNavigate } from 'react-router-dom';
import { PhieuNhap, PhieuNhapByID } from '../../../../types';
import LoadingWrapper from '../../../Utils/Wrappers/LoadingWrapper';
import DeletePhieuNhap from '../../Delete/DeletePhieuNhap';
import PhieuNhapDetails from '../PhieuNhapDetails';

interface Props {
    id: string;
    data: PhieuNhapByID | undefined;
    loading: boolean;
}

const DetailsTab = ({ id, data, loading }: Props) => {
    const navigate = useNavigate();
    const modals = useModals();

    const openDeleteModal = (phieuNhap: PhieuNhap | undefined) => {
        if (!phieuNhap) {
            return;
        }
        const modalId = modals.openModal({
            title: <h3>Xóa phiếu nhập</h3>,
            children: <DeletePhieuNhap
                phieuNhap={phieuNhap}
                closeModal={() => modals.closeModal(modalId)}
                callback={() => navigate('/phieu-nhap')}
            />
        });
    };

    return (
        <LoadingWrapper loading={loading}>
            {data && data.phieuNhap.byID && <Box>
                <Center mb='md'>
                    <Title>Chi tiết phiếu nhập</Title>
                </Center>
                <PhieuNhapDetails data={data.phieuNhap.byID} />

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

export default DetailsTab;