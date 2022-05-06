import { useMutation } from '@apollo/client';

import { Box, Button, Group, Text } from '@mantine/core';

import { showErrorNotification, showSuccessNotification } from '../../../events';
import { chiTietPhieuXuatQuery } from '../../../graphql/queries';

interface Props {
    tenSanPham: string;
    idPhieuXuat: string;
    idChiTiet: string;
    closeModal: () => void;
}

const DeleteChiTietPhieuXuat = ({ tenSanPham, idPhieuXuat, idChiTiet, closeModal }: Props) => {
    const [deleteChiTietPhieuXuat, { loading }] = useMutation<
        never, { idPhieuXuat: string, idChiTiet: string }
    >(chiTietPhieuXuatQuery.DELETE, {
        onCompleted: () => {
            showSuccessNotification(`Xóa sản phẩm "${tenSanPham}" khỏi phiếu xuất thành công`);
            closeModal();
        },
        onError: (error) => showErrorNotification(error.message)
    });

    const handleDelete = () => {
        void deleteChiTietPhieuXuat({
            variables: {
                idChiTiet,
                idPhieuXuat
            }
        });
    };

    return (
        <Box>
            <Text>
                Bạn có chắc muốn xóa sản phẩm <b>{`"${tenSanPham}"`}</b> khỏi phiếu xuất này?
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

export default DeleteChiTietPhieuXuat;