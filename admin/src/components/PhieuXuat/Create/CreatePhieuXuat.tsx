import { useApolloClient, useMutation } from '@apollo/client';

import { Box, Center, Title } from '@mantine/core';
import PhieuXuatForm from '../Form/PhieuXuatForm';

import { showErrorNotification, showSuccessNotification } from '../../../events';
import { phieuXuatQuery } from '../../../graphql/queries';
import { ChiTietPhieuXuatFormData } from '../../../types';

export interface PhieuXuatVars {
    payload: Array<ChiTietPhieuXuatFormData>
}

const CreatePhieuXuat = () => {
    const client = useApolloClient();
    const [createPhieuXuat, { loading }] = useMutation<
        never, PhieuXuatVars
    >(phieuXuatQuery.CREATE, {
        onCompleted: () => {
            showSuccessNotification('Tạo phiếu xuất thành công');
            client.cache.evict({
                id: 'ROOT_QUERY',
                fieldName: 'phieuXuat',
            });
            client.cache.gc();
        },
        onError: (error) => showErrorNotification(error.message)
    });

    const handleSubmit = (values: PhieuXuatVars, callback: () => void) => {
        void createPhieuXuat({
            variables: values,
            onCompleted: callback
        });
    };

    return (
        <Box>
            <Center mb='sm'><Title>Tạo phiếu xuất</Title></Center>
            <PhieuXuatForm
                loading={loading}
                handleSubmit={handleSubmit}
            />
        </Box>
    );
};

export default CreatePhieuXuat;