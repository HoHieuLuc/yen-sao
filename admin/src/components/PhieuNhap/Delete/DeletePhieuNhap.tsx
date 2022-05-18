import { Box, Button, Group, Text } from '@mantine/core';

import { convertToShortDate } from '../../../utils/common';
import { phieuNhapHooks } from '../../../graphql/queries';
import { PhieuNhap } from '../../../types';

interface Props {
    phieuNhap: PhieuNhap;
    closeModal: () => void;
    callback?: () => void;
}

const DeletePhieuNhap = ({ phieuNhap, closeModal, callback }: Props) => {
    const [deletePhieuNhap, { loading }] = phieuNhapHooks.useDeletePhieuNhap();

    const handleDelete = () => {
        void deletePhieuNhap({
            variables: {
                id: phieuNhap.id
            },
            onCompleted: () => {
                closeModal();
                callback && callback();
            }
        });
    };

    return (
        <Box>
            <Text>
                Bạn có chắc muốn xóa phiếu nhập ngày {convertToShortDate(phieuNhap.ngayNhap)}?
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

export default DeletePhieuNhap;