import { useDocumentTitle } from '@mantine/hooks';
import { useParams } from 'react-router-dom';

import LoadingWrapper from '../../Utils/Wrappers/LoadingWrapper';
import { Center, Stack, Title } from '@mantine/core';
import NotFound from '../../Utils/Errors/NotFound';
import CamNangForm from '../Form/CamNangForm';

import { showErrorNotification } from '../../../events';
import { camNangHooks } from '../../../graphql/queries';
import { CamNangFormData } from '../../../types';

const EditCamNang = () => {
    const { id } = useParams();
    const { data, loading, error } = camNangHooks.useCamNangByID(id || '');

    const [updateCamNang, { loading: updateLoading }] = camNangHooks.useUpdateCamNang();

    useDocumentTitle(
        `Cẩm nang ${data && data.camNang.byID 
            ? data.camNang.byID.tieuDe
            : 'Đang tải...'} | Chỉnh sửa`
    );

    if (error || !id || (data && data.camNang.byID === null)) {
        return <NotFound />;
    }

    const handleUpdate = (values: CamNangFormData) => {
        if (!values.anhDaiDien) {
            return showErrorNotification('Vui lòng chọn ít nhất 1 ảnh');
        }
        void updateCamNang({
            variables: {
                id,
                payload: values
            }
        });
    };

    return (
        <LoadingWrapper loading={loading}>
            <Stack spacing='xs'>
                <Center>
                    <Title>Chỉnh sửa cẩm nang</Title>
                </Center>
                {data && <CamNangForm
                    loading={updateLoading}
                    inititalValues={data.camNang.byID}
                    onSubmit={handleUpdate}
                />}
            </Stack>
        </LoadingWrapper>
    );
};

export default EditCamNang;