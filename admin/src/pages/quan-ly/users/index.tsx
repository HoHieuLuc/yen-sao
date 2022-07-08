import { useDocumentTitle } from '@mantine/hooks';

import UserList from '../../../components/Manage/User/List/UserList';

interface Props {
    title: string;
}

const ManageUsersPage = ({ title }: Props) => {
    useDocumentTitle(title);
    
    return (
        <UserList />
    );
};

export default ManageUsersPage;