import { Box, Center, Title } from '@mantine/core';
import PhieuXuatForm from '../Form/PhieuXuatForm';

import { phieuXuatHooks } from '../../../graphql/queries';
import { CreatePhieuXuatVars } from '../../../types';

const CreatePhieuXuat = () => {
    const [createPhieuXuat, { loading }] = phieuXuatHooks.useCreatePhieuXuat();
    const handleCreatePhieuXuat = (values: CreatePhieuXuatVars, callback: () => void) => {
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
                onSubmit={handleCreatePhieuXuat}
            />
        </Box>
    );
};

export default CreatePhieuXuat;