import { useMutation } from '@apollo/client';
import { Box, Button, Group, Text } from '@mantine/core';
import { showErrorNotification, showSuccessNotification } from '../../../events';
import { chiTietPhieuNhapQuery } from '../../../graphql/queries';

interface Props {
    tenSanPham: string;
    idPhieuNhap: string;
    idChiTiet: string;
    closeModal: () => void;
}

const DeleteChiTietPhieuNhap = ({ tenSanPham, idPhieuNhap, idChiTiet, closeModal }: Props) => {
    const [deleteChiTietPhieuNhap, { loading }] = useMutation<
        never, { idPhieuNhap: string, idChiTiet: string }
    >(chiTietPhieuNhapQuery.DELETE, {
        onCompleted: () => {
            showSuccessNotification('Xóa chi tiết phiếu nhập thành công');
            closeModal();
        },
        onError: (error) => showErrorNotification(error.message)
    });

    const handleDelete = () => {
        void deleteChiTietPhieuNhap({
            variables: {
                idChiTiet,
                idPhieuNhap
            }
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