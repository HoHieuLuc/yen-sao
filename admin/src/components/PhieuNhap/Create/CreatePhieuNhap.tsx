import { useApolloClient, useMutation } from '@apollo/client';
import { Box, Center, Title } from '@mantine/core';
import { showErrorNotification, showSuccessNotification } from '../../../events';
import { phieuNhapQuery } from '../../../graphql/queries';
import { ChiTietPhieuNhapFormData } from '../Form/ChiTietPhieuNhapForm';
import PhieuNhapForm from '../Form/PhieuNhapForm';

export interface PhieuNhapVars {
    payload: Array<ChiTietPhieuNhapFormData>
}

const CreatePhieuNhap = () => {
    const client = useApolloClient();
    const [createPhieuNhap, { loading }] = useMutation<
        never, PhieuNhapVars
    >(phieuNhapQuery.CREATE, {
        onCompleted: () => {
            showSuccessNotification('Tạo phiếu nhập thành công');
            client.cache.evict({
                id: 'ROOT_QUERY',
                fieldName: 'phieuNhap',
            });
        },
        onError: (error) => showErrorNotification(error.message)
    });

    const handleSubmit = (values: PhieuNhapVars, callback: () => void) => {
        void createPhieuNhap({
            variables: values,
            onCompleted: callback
        });
    };

    return (
        <Box>
            <Center mb='sm'><Title>Tạo phiếu nhập</Title></Center>
            <PhieuNhapForm
                loading={loading}
                handleSubmit={handleSubmit}
            />
        </Box>
    );
};

export default CreatePhieuNhap;