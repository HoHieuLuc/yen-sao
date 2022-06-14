import { Link, useNavigate } from 'react-router-dom';
import { useModals } from '@mantine/modals';

import LoadingWrapper from '../../../Utils/Wrappers/LoadingWrapper';
import DeleteCamNang from '../../Delete/DeleteCamNang';
import { Button, Group, Stack } from '@mantine/core';
import CamNangDetails from '../CamNangDetails';

import { CamNang, CamNangByID } from '../../../../types';
import { authHooks } from '../../../../graphql/queries';

interface Props {
    data: CamNangByID | undefined;
    loading: boolean;
}

const DetailsTab = ({ data, loading }: Props) => {
    const navigate = useNavigate();
    const me = authHooks.useReadCurrentUser();

    const modals = useModals();
    const openDeleteModal = (camNang: CamNang) => {
        const modalId = modals.openModal({
            title: <h3>Xóa cẩm nang</h3>,
            children: <DeleteCamNang
                data={camNang}
                closeModal={() => modals.closeModal(modalId)}
                callback={() => navigate('/cam-nang')}
            />
        });
    };

    return (
        <LoadingWrapper loading={loading}>
            {data &&
                <Stack spacing='xs'>
                    <CamNangDetails
                        data={data.camNang.byID}
                    />
                    <Group position='right'>
                        {me.role === 'admin' && <Button
                            color='red'
                            onClick={() => openDeleteModal(data.camNang.byID)}
                        >
                            Xóa
                        </Button>}
                        <Button
                            color='teal'
                            component={Link}
                            to={`/cam-nang/${data.camNang.byID.id}/sua`}
                        >
                            Sửa
                        </Button>
                    </Group>
                </Stack>
            }
        </LoadingWrapper>
    );
};

export default DetailsTab;