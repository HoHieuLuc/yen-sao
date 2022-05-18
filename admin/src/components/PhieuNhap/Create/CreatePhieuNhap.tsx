import { Box, Center, Title } from '@mantine/core';
import PhieuNhapForm from '../Form/PhieuNhapForm';

import { phieuNhapHooks } from '../../../graphql/queries';
import { CreatePhieuNhapVars } from '../../../types';

const CreatePhieuNhap = () => {
    const [createPhieuNhap, { loading }] = phieuNhapHooks.useCreatePhieuNhap();

    const handleSubmit = (values: CreatePhieuNhapVars, callback: () => void) => {
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