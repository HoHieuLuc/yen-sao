import { Box, Button, Group, Text } from '@mantine/core';

import { convertToShortDate } from '../../../utils/common';
import { phieuXuatHooks } from '../../../graphql/queries';
import { PhieuXuat } from '../../../types';

interface Props {
    phieuXuat: PhieuXuat;
    closeModal: () => void;
    callback?: () => void;
}

const DeletePhieuXuat = ({ phieuXuat, closeModal, callback }: Props) => {
    const [deletePhieuXuat, { loading }] = phieuXuatHooks.useDeletePhieuXuat();

    const handleDelete = () => {
        void deletePhieuXuat({
            variables: {
                id: phieuXuat.id
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
                Bạn có chắc muốn xóa phiếu xuất ngày {convertToShortDate(phieuXuat.ngayXuat)}?
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

export default DeletePhieuXuat;