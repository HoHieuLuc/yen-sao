import { Link, useNavigate } from 'react-router-dom';
import { useModals } from '@mantine/modals';

import LoadingWrapper from '../../../Utils/Wrappers/LoadingWrapper';
import { Box, Button, Center, Group, Title } from '@mantine/core';
import DeleteSanPham from '../../Delete/DeleteSanPham';
import SanPhamDetails from '../SanPhamDetails';

import { SanPham, SanPhamByID } from '../../../../types';
import { authHooks } from '../../../../graphql/queries';

interface Props {
    id: string;
    data: SanPhamByID | undefined;
    loading: boolean;
}

const DetailsTab = ({ id, data, loading }: Props) => {
    const me = authHooks.useReadCurrentUser();
    const navigate = useNavigate();

    const modals = useModals();
    const openDeleteModal = (sanPham: SanPham | undefined) => {
        if (!sanPham) {
            return;
        }
        const modalId = modals.openModal({
            title: <h3>Xóa sản phẩm</h3>,
            children: <DeleteSanPham
                data={sanPham}
                closeModal={() => modals.closeModal(modalId)}
                callback={() => navigate('/san-pham')}
            />
        });
    };

    return (
        <LoadingWrapper loading={loading}>
            {data && data.sanPham.byID && <Box>
                <Center>
                    <Title>Chi tiết sản phẩm</Title>
                </Center>
                <SanPhamDetails 
                    data={data.sanPham.byID}
                />
                {me.role === 'admin' && <Group position='right'>
                    <Button
                        color='red'
                        onClick={() => openDeleteModal(data.sanPham.byID)}
                    >
                        Xóa
                    </Button>
                    <Button
                        component={Link}
                        to={`/san-pham/${id}/sua`}
                        color='teal'
                    >
                        Sửa
                    </Button>
                </Group>}
            </Box>}
        </LoadingWrapper>
    );
};

export default DetailsTab;