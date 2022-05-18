import { Box, Button, Group, Text } from '@mantine/core';

import { chiTietPhieuXuatHooks } from '../../../graphql/queries';

interface Props {
    tenSanPham: string;
    idPhieuXuat: string;
    idChiTiet: string;
    closeModal: () => void;
}

const DeleteChiTietPhieuXuat = ({ tenSanPham, idPhieuXuat, idChiTiet, closeModal }: Props) => {
    const [
        deleteChiTietPhieuXuat, 
        { loading }
    ] = chiTietPhieuXuatHooks.useDeleteChiTietPhieuXuat(tenSanPham, idChiTiet);

    const handleDelete = () => {
        void deleteChiTietPhieuXuat({
            variables: {
                idChiTiet,
                idPhieuXuat
            },
            onCompleted: closeModal
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