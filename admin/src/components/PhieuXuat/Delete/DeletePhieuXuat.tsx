import { useApolloClient, useMutation } from '@apollo/client';

import { Box, Button, Group, Text } from '@mantine/core';

import { showErrorNotification, showSuccessNotification } from '../../../events';
import { convertToVietnameseDate } from '../../../utils/common';
import { phieuXuatQuery } from '../../../graphql/queries';
import { PhieuXuatDoc } from '../List/PhieuXuatList';

interface Props {
    phieuXuat: PhieuXuatDoc;
    closeModal: () => void;
    callback?: () => void;
}

const DeletePhieuXuat = ({ phieuXuat, closeModal, callback }: Props) => {
    const client = useApolloClient();
    const [deletePhieuXuat, { loading }] = useMutation<
        never, { id: string }
    >(phieuXuatQuery.DELETE, {
        onCompleted: () => {
            showSuccessNotification(
                `Xóa phiếu xuất thành công`
            );
            client.cache.evict({
                id: 'ROOT_QUERY',
                fieldName: 'phieuXuat',
            });
            closeModal();
        },
        onError: (error) => {
            showErrorNotification(error.message);
        }
    });

    const handleDelete = () => {
        void deletePhieuXuat({
            variables: {
                id: phieuXuat.id
            },
            onCompleted: callback
        });
    };

    return (
        <Box>
            <Text>
                Bạn có chắc muốn xóa phiếu xuất ngày {convertToVietnameseDate(phieuXuat.createdAt)}?
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