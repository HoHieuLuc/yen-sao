import { Center, Stack, Title } from '@mantine/core';
import CamNangForm from '../Form/CamNangForm';

import { showErrorNotification } from '../../../events';
import { camNangHooks } from '../../../graphql/queries';
import { CamNangFormData } from '../../../types';

const CreateCamNang = () => {
    const [createCamNang, { loading }] = camNangHooks.useCreateCamNang();

    const handleCreateCamNang = (values: CamNangFormData) => {
        if (!values.anhDaiDien) {
            return showErrorNotification('Vui lòng chọn ít nhất 1 ảnh');
        }
        void createCamNang({
            variables: {
                payload: values
            }
        });
    };

    return (
        <Stack spacing='xs'>
            <Center>
                <Title>Thêm cẩm nang mới</Title>
            </Center>
            <CamNangForm
                loading={loading}
                onSubmit={handleCreateCamNang}
            />
        </Stack>
    );
};

export default CreateCamNang;