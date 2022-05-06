import { useMutation, useApolloClient } from '@apollo/client';

import { Box, Button, Group, Text } from '@mantine/core';

import { showErrorNotification, showSuccessNotification } from '../../../events';
import { loaiSanPhamQuery } from '../../../graphql/queries';
import { LoaiSanPham } from '../../../types';

interface Props {
    loaiSanPham: LoaiSanPham;
    closeModal: () => void;
}

interface LoaiSanPhamData {
    loaiSanPham: {
        delete: LoaiSanPham;
    }
}

const DeleteLoaiSanPham = ({ loaiSanPham, closeModal }: Props) => {
    const client = useApolloClient();
    const [deleteLoaiSanPham, { loading }] = useMutation<
        LoaiSanPhamData, { id: string }
    >(loaiSanPhamQuery.DELETE, {
        onCompleted: (data) => {
            showSuccessNotification(
                `Xóa loại sản phẩm ${data.loaiSanPham.delete.tenLoaiSanPham} thành công`
            );
            client.cache.evict({
                id: 'ROOT_QUERY',
                fieldName: 'loaiSanPham',
            });
            closeModal();
        },
        onError: (error) => {
            showErrorNotification(error.message);
        }
    });

    const handleDelete = () => {
        void deleteLoaiSanPham({
            variables: {
                id: loaiSanPham.id
            }
        });
    };

    return (
        <Box>
            <Text>Bạn có chắc muốn xóa {loaiSanPham.tenLoaiSanPham}?</Text>
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

export default DeleteLoaiSanPham;