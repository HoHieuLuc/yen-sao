
import { Center, Stack, Title } from '@mantine/core';
import CamNangForm from '../Form/CamNangForm';

import { showErrorNotification } from '../../../events';
import { camNangHooks } from '../../../graphql/queries';
import { CamNang, CamNangFormData } from '../../../types';

interface Props {
    data: CamNang;
}

const EditCamNang = ({ data }: Props) => {
    const [updateCamNang, { loading }] = camNangHooks.useUpdateCamNang();

    const handleUpdate = (values: CamNangFormData) => {
        if (!values.anhDaiDien) {
            return showErrorNotification('Vui lòng chọn ít nhất 1 ảnh');
        }
        void updateCamNang({
            variables: {
                id: data.id,
                payload: values
            }
        });
    };

    return (
        <Stack spacing='xs'>
            <Center>
                <Title>Chỉnh sửa cẩm nang</Title>
            </Center>
            <CamNangForm
                loading={loading}
                inititalValues={data}
                onSubmit={handleUpdate}
            />
        </Stack>
    );
};

export default EditCamNang;