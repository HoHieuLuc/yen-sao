import { useDebouncedSearchParams, usePagination } from '../../../hooks';
import { useDocumentTitle } from '@mantine/hooks';

import { Center, ScrollArea, Stack, Table, TextInput } from '@mantine/core';
import AppPagination from '../../Utils/Pagination/AppPagination';
import LoadingWrapper from '../../Utils/Wrappers/LoadingWrapper';
import ErrorPage from '../../Utils/Errors/ErrorPage';
import { SearchIcon } from '../../Utils/Icons';
import CamNangItem from './CamNangItem';

import { camNangHooks } from '../../../graphql/queries';

interface Props {
    title: string;
}

const CamNangList = ({ title }: Props) => {
    useDocumentTitle(title);
    const { currentPage, handlePageChange, limit, handleLimitChange } = usePagination();
    const { search, setSearch, debouncedSearch } = useDebouncedSearchParams(300);
    const { data, loading, error } = camNangHooks.useAllCamNangs({
        page: currentPage,
        limit,
        search: debouncedSearch
    });

    if (error) {
        return <ErrorPage />;
    }

    const camNangElements = data?.camNang.all.docs.map((camNang, index) => (
        <CamNangItem
            key={camNang.id}
            data={camNang}
            index={limit * (currentPage - 1) + (index + 1)}
        />
    ));

    return (
        <LoadingWrapper loading={loading}>
            <Stack spacing='xs'>
                <TextInput
                    label='Tìm kiếm'
                    placeholder='Tìm kiếm cẩm nang'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    rightSection={<SearchIcon />}
                />
                <ScrollArea style={{ whiteSpace: 'break-spaces' }}>
                    <Table striped highlightOnHover mb='sm'>
                        <thead>
                            <tr style={{ whiteSpace: 'nowrap' }}>
                                <th>STT</th>
                                <th>Tiêu đề</th>
                                <th>Ngày đăng</th>
                                <th>Trạng thái</th>
                                <th>
                                    <Center>
                                        Chức năng
                                    </Center>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {camNangElements}
                        </tbody>
                    </Table>
                </ScrollArea>
                {data && <AppPagination
                    total={data.camNang.all.pageInfo.totalPages}
                    limit={limit.toString()}
                    onLimitChange={handleLimitChange}
                    onChange={handlePageChange}
                />}
            </Stack>
        </LoadingWrapper>
    );
};

export default CamNangList;