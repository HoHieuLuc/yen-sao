import { useApolloClient, useMutation } from '@apollo/client';

import { Box, Button, Group, Text } from '@mantine/core';

import { showErrorNotification, showSuccessNotification } from '../../../events';
import { convertToVietnameseDate } from '../../../utils/common';
import { phieuNhapQuery } from '../../../graphql/queries';
import { PhieuNhapDoc } from '../List/PhieuNhapList';

interface Props {
    phieuNhap: PhieuNhapDoc;
    closeModal: () => void;
    callback?: () => void;
}

const DeletePhieuNhap = ({ phieuNhap, closeModal, callback }: Props) => {
    const client = useApolloClient();
    const [deletePhieuNhap, { loading }] = useMutation<
        never, { id: string }
    >(phieuNhapQuery.DELETE, {
        onCompleted: () => {
            showSuccessNotification(
                `Xóa phiếu nhập thành công`
            );
            client.cache.evict({
                id: 'ROOT_QUERY',
                fieldName: 'phieuNhap',
            });
            closeModal();
        },
        onError: (error) => {
            showErrorNotification(error.message);
        }
    });

    const handleDelete = () => {
        void deletePhieuNhap({
            variables: {
                id: phieuNhap.id
            },
            onCompleted: callback
        });
    };

    return (
        <Box>
            <Text>
                Bạn có chắc muốn xóa phiếu nhập ngày {convertToVietnameseDate(phieuNhap.createdAt)}?
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