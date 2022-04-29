import { useMutation, useApolloClient } from '@apollo/client';
import { Box, Button, Group, Text } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { DELETE_LOAI_SAN_PHAM } from '../../../graphql/queries';
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
    >(DELETE_LOAI_SAN_PHAM, {
        onCompleted: (data) => {
            showNotification({
                title: 'Thông báo',
                message: `Xóa loại sản phẩm ${data.loaiSanPham.delete.tenLoaiSanPham} thành công`,
            });
            client.cache.evict({
                id: 'ROOT_QUERY',
                fieldName: 'loaiSanPham',
            });
            closeModal();
        },
        onError: (error) => {
            showNotification({
                title: 'Thông báo',
                message: error.message,
                color: 'red',
            });
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