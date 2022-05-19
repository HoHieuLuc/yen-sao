import { useModals } from '@mantine/modals';

import { Anchor, Button, Center } from '@mantine/core';
import { User } from '../../../../types';
import { Link } from 'react-router-dom';
import BanUser from '../BanUser';

interface Props {
    index: number;
    user: User;
}

const UserItem = ({ user, index }: Props) => {
    const modals = useModals();

    const openBanModal = () => {
        const modalId = modals.openModal({
            title: <h3>{user.isBanned ? 'Mở khóa tài khoản' : 'Khóa tài khoản'}</h3>,
            children: <BanUser
                user={user}
                closeModal={() => modals.closeModal(modalId)}
            />
        });
    };

    return (
        <tr key={user.id}>
            <td>{index}</td>
            <td>
                <Anchor
                    component={Link}
                    to={`/quan-ly/users/${user.id}`}
                >
                    {user.username} {user.isBanned && '(Đã khóa tài khoản)'}
                </Anchor>
            </td>
            <td>{user.fullname}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
                <Center>
                    <Button
                        onClick={openBanModal}
                        color='red'
                        variant='subtle'
                    >
                        {user.isBanned ? 'Mở khóa' : 'Khóa'}
                    </Button>
                </Center>
            </td>
        </tr>
    );
};

export default UserItem;