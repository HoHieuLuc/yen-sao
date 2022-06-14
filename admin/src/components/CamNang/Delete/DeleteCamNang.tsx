import { Box, Button, Group, Text } from '@mantine/core';

import { camNangHooks } from '../../../graphql/queries';
import { CamNang } from '../../../types';

interface Props {
    data: CamNang;
    closeModal: () => void;
    callback: () => void;
}

const DeleteCamNang = ({ data, closeModal, callback }: Props) => {
    const [DeleteCamNang, { loading }] = camNangHooks.useDeleteCamNang();

    const handleDelete = () => {
        void DeleteCamNang({
            variables: {
                id: data.id
            },
            onCompleted: () => {
                callback();
                closeModal();
            }
        });
    };

    return (
        <Box>
            <Text>
                Bạn có chắc muốn xóa cẩm nang <b>{data.tieuDe}</b>?
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

export default DeleteCamNang;