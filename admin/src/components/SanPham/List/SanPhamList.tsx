import {
    useDebouncedSearchParams,
    usePagination,
    useSortParams,
} from '../../../hooks';

import { Center, ScrollArea, Stack, Table, Text, TextInput, UnstyledButton } from '@mantine/core';
import { SortIcon, LinkIcon, SearchIcon } from '../../Utils/Icons';
import LoadingWrapper from '../../Utils/Wrappers/LoadingWrapper';
import AppPagination from '../../Utils/Pagination/AppPagination';
import ErrorPage from '../../Utils/Errors/ErrorPage';

import { authHooks, sanPhamHooks } from '../../../graphql/queries';

const SanPhamList = () => {
    const me = authHooks.useReadCurrentUser();
    const { search, debouncedSearch, setSearch } = useDebouncedSearchParams(300);
    const { currentPage, handlePageChange, limit, handleLimitChange } = usePagination();
    const [sortSanPham, toggleSortSoLuong] = useSortParams(
        {
            soLuong: [null, 'SO_LUONG_ASC', 'SO_LUONG_DESC'],
            isFeatured: [null, 'FEATURED_ASC', 'FEATURED_DESC'],
        }
    );

    const { data, loading, error } = sanPhamHooks.useAllSanPhams(
        {
            page: currentPage,
            limit: limit,
            search: debouncedSearch,
            sort: sortSanPham.currentSortValue
        }
    );

    if (error) {
        return <ErrorPage />;
    }

    const sanPhamElements = data?.sanPham.all.docs.map((sanPham, index) => (
        <tr key={sanPham.id}>
            <td>{limit * (currentPage - 1) + (index + 1)}</td>
            <td style={{ width: '50%' }}>
                <Text lineClamp={1}>
                    {sanPham.tenSanPham}
                </Text>
            </td>
            <td>{sanPham.soLuong / 1000}</td>
            <td>
                {sanPham.isPublic ? 'Công khai' : 'Không công khai'}
                {sanPham.isFeatured ? ' - Đầu trang' : ''}
            </td>
            <td>
                <Center>
                    {me.role === 'admin' && <LinkIcon
                        to={`/san-pham/${sanPham.id}/sua`}
                        label='Sửa'
                        iconType='edit'
                        color='green'
                    />}
                    <LinkIcon
                        to={`/san-pham/${sanPham.id}`}
                        label='Chi tiết'
                        iconType='info'
                        color='blue'
                    />
                </Center>
            </td>
        </tr>
    ));

    return (
        <LoadingWrapper loading={loading}>
            <Stack spacing='xs'>
                <TextInput
                    label='Tìm kiếm'
                    placeholder='Tìm kiếm sản phẩm'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    rightSection={<SearchIcon />}
                />
                <ScrollArea style={{ whiteSpace: 'break-spaces' }}>
                    <Table striped highlightOnHover>
                        <thead>
                            <tr style={{ whiteSpace: 'nowrap' }}>
                                <th>STT</th>
                                <th style={{ width: '50%' }}>Tên sản phẩm</th>
                                <th>
                                    <UnstyledButton onClick={() => toggleSortSoLuong('soLuong')}>
                                        Số lượng tồn (kg) <SortIcon
                                            currentSort={sortSanPham.currentSortValue}
                                            ascValue='SO_LUONG_ASC'
                                            descValue='SO_LUONG_DESC'
                                        />
                                    </UnstyledButton>
                                </th>
                                <th>
                                    <UnstyledButton onClick={() => toggleSortSoLuong('isFeatured')}>
                                        Tình trạng <SortIcon
                                            currentSort={sortSanPham.currentSortValue}
                                            ascValue='FEATURED_ASC'
                                            descValue='FEATURED_DESC'
                                        />
                                    </UnstyledButton>
                                </th>
                                <th>
                                    <Center>
                                        Chức năng
                                    </Center>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {sanPhamElements}
                        </tbody>
                    </Table>
                </ScrollArea>
                {data && (
                    <AppPagination
                        total={data.sanPham.all.pageInfo.totalPages}
                        siblings={1}
                        page={currentPage}
                        onChange={handlePageChange}
                        limit={limit.toString()}
                        onLimitChange={handleLimitChange}
                    />
                )}
            </Stack>
        </LoadingWrapper>
    );
};

export default SanPhamList;