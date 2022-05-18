import { Box, Button, Group, Text } from '@mantine/core';

import { chiTietPhieuNhapHooks } from '../../../graphql/queries';

interface Props {
    tenSanPham: string;
    idPhieuNhap: string;
    idChiTiet: string;
    closeModal: () => void;
}

const DeleteChiTietPhieuNhap = ({ tenSanPham, idPhieuNhap, idChiTiet, closeModal }: Props) => {
    const [
        deleteChiTietPhieuNhap, { loading }
    ] = chiTietPhieuNhapHooks.useDeleteChiTietPhieuNhap(tenSanPham);

    const handleDelete = () => {
        void deleteChiTietPhieuNhap({
            variables: {
                idChiTiet,
                idPhieuNhap
            },
            onCompleted: closeModal
        });
    };

    return (
        <Box>
            <Text>
                Bạn có chắc muốn xóa sản phẩm <b>{`"${tenSanPham}"`}</b> khỏi phiếu nhập này?
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

export default DeleteChiTietPhieuNhap;