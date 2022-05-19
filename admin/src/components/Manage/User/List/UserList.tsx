import { useDebouncedSearchParams, usePagination } from '../../../../hooks';
import { userHooks } from '../../../../graphql/queries';
import { useDocumentTitle } from '@mantine/hooks';

import { Center, ScrollArea, Table, TextInput } from '@mantine/core';
import LoadingWrapper from '../../../Utils/Wrappers/LoadingWrapper';
import MyPagination from '../../../Utils/Pagination/MyPagination';
import ErrorPage from '../../../Utils/Errors/ErrorPage';
import { SearchIcon } from '../../../Utils/Icons';
import UserItem from './UserItem';

interface Props {
    title: string;
}

const UserList = ({ title }: Props) => {
    useDocumentTitle(title);
    const { search, setSearch, debouncedSearch } = useDebouncedSearchParams(300);
    const { currentPage, handlePageChange, limit, handleLimitChange } = usePagination();
    const { data, loading, error } = userHooks.useAllUsers(
        {
            page: currentPage,
            limit,
            search: debouncedSearch
        }
    );

    if (error) {
        return <ErrorPage />;
    }

    const userElements = data?.user.all.docs.map((u, index) => (
        <UserItem
            key={u.id}
            user={u}
            index={limit * (currentPage - 1) + (index + 1)}
        />
    ));

    return (
        <LoadingWrapper loading={loading}>
            <TextInput
                label='Tìm kiếm'
                placeholder='Tìm kiếm...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                rightSection={<SearchIcon />}
                mb='xs'
            />
            <ScrollArea style={{ whiteSpace: 'break-spaces' }}>
                <Table striped highlightOnHover mb='sm'>
                    <thead>
                        <tr style={{ whiteSpace: 'nowrap' }}>
                            <th>STT</th>
                            <th>Tên tài khoản</th>
                            <th>Họ và tên</th>
                            <th>Email</th>
                            <th>Quyền</th>
                            <th>
                                <Center>
                                    Chức năng
                                </Center>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {userElements}
                    </tbody>
                </Table>
            </ScrollArea>
            {data && <MyPagination
                total={data.user.all.pageInfo.totalPages}
                limit={limit.toString()}
                onLimitChange={handleLimitChange}
                onChange={handlePageChange}
            />}
        </LoadingWrapper>
    );
};

export default UserList;