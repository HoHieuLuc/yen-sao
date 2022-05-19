import { useNavigate, Link } from 'react-router-dom';
import { useModals } from '@mantine/modals';

import LoadingWrapper from '../../../Utils/Wrappers/LoadingWrapper';
import { Box, Center, Title, Group, Button } from '@mantine/core';
import DeletePhieuXuat from '../../Delete/DeletePhieuXuat';
import PhieuXuatDetails from '../PhieuXuatDetails';

import { PhieuXuat, PhieuXuatByID } from '../../../../types';

interface Props {
    id: string;
    data: PhieuXuatByID | undefined;
    loading: boolean;
}

const DetailsTab = ({ id, data, loading }: Props) => {
    const navigate = useNavigate();

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

    return (
        <LoadingWrapper loading={loading}>
            {data && <Box>
                <Center mb='md'>
                    <Title>Chi tiết phiếu xuất</Title>
                </Center>
                <PhieuXuatDetails
                    data={data.phieuXuat.byID}
                />
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

export default DetailsTab;