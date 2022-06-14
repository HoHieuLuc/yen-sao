import { Box, Button, Group, Text } from '@mantine/core';

import { sanPhamHooks } from '../../../graphql/queries';
import { SanPham } from '../../../types';

interface Props {
    data: SanPham;
    closeModal: () => void;
    callback: () => void;
}

const DeleteSanPham = ({ data, closeModal, callback }: Props) => {
    const [deleteSanPham, { loading }] = sanPhamHooks.useDeleteSanPham();

    const handleDelete = () => {
        void deleteSanPham({
            variables: {
                id: data.id
            },
            onCompleted: () => {
                callback();
                closeModal();
            }
        });
    };

    return (
        <Box>
            <Text>
                Bạn có chắc muốn xóa sản phẩm {data.tenSanPham}?
            </Text>
            <Group position='right' mt='md'>
                <Button
                    color='gray'
                    onClick={closeModal}
                >
                    Hủy
                </Button>
                <Button
                    color='red'
                    onClick={handleDelete}
                    loading={loading}
                >
                    Xóa
                </Button>
            </Group>
        </Box>
    );
};

export default DeleteSanPham;