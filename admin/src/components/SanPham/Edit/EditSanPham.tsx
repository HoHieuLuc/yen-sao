import { Box, Center, Title } from '@mantine/core';
import SanPhamForm from '../Form/SanPhamForm';

import { SanPham, SanPhamFormData } from '../../../types';
import { sanPhamHooks } from '../../../graphql/queries';

interface Props {
    data: SanPham;
}

const EditSanPham = ({ data }: Props) => {

    const [updateSanPham, { loading }] = sanPhamHooks.useUpdateSanPham();

    const handleUpdate = (values: SanPhamFormData) => {
        void updateSanPham({
            variables: {
                id: data.id,
                payload: values
            }
        });
    };

    return (
        <Box>
            <Center mb='md'>
                <Title>Chỉnh sửa sản phẩm</Title>
            </Center>
            <SanPhamForm
                loading={loading}
                onSubmit={handleUpdate}
                initialValues={data}
            />
        </Box>
    );
};

export default EditSanPham;