import { Box, Button, Group, Text } from '@mantine/core';

import { userHooks } from '../../../graphql/queries';
import { User } from '../../../types';

interface Props {
    user: User;
    closeModal: () => void;
}

const BanUser = ({ user, closeModal }: Props) => {
    const [banUser, { loading }] = userHooks.useBanUser();

    const handleBanUser = () => {
        void banUser({
            variables: {
                id: user.id,
                isBanned: !user.isBanned
            },
            onCompleted: () => closeModal()
        });
    };

    return (
        <Box>
            <Text>
                Bạn có chắc muốn {user.isBanned ? 'mở khóa' : 'khóa'} tài khoản {user.username}?
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
                    onClick={handleBanUser}
                    loading={loading}
                >
                    {user.isBanned ? 'Mở khóa' : 'Khóa'}
                </Button>
            </Group>
        </Box>
    );
};

export default BanUser;