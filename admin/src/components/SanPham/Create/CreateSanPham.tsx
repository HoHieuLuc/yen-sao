import { Center, Stack, Title } from '@mantine/core';
import SanPhamForm from '../Form/SanPhamForm';

import { sanPhamHooks } from '../../../graphql/queries';
import { SanPhamFormData } from '../../../types';

const CreateSanPham = () => {
    const [createSanPham, { loading }] = sanPhamHooks.useCreateSanPham();

    const handleCreateSanPham = (values: SanPhamFormData) => {
        void createSanPham({
            variables: {
                payload: values
            }
        });
    };

    return (
        <Stack spacing='xs'>
            <Center>
                <Title>Thêm sản phẩm mới</Title>
            </Center>
            <SanPhamForm
                loading={loading}
                onSubmit={handleCreateSanPham}
            />
        </Stack>
    );
};

export default CreateSanPham;