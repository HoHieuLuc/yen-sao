import { useDocumentTitle } from '@mantine/hooks';

import { Box, Center, Title } from '@mantine/core';
import PhieuXuatForm from '../Form/PhieuXuatForm';

import { phieuXuatHooks } from '../../../graphql/queries';
import { CreatePhieuXuatVars } from '../../../types';

interface Props {
    title: string;
}

const CreatePhieuXuat = ({ title }: Props) => {
    useDocumentTitle(title);
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
                handleSubmit={handleCreatePhieuXuat}
            />
        </Box>
    );
};

export default CreatePhieuXuat;