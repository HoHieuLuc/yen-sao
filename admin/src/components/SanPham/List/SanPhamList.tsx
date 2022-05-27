import { useDocumentTitle } from '@mantine/hooks';
import {
    useDebouncedSearchParams,
    usePagination,
    useSortParams,
} from '../../../hooks';

import { Center, ScrollArea, Table, Text, TextInput, UnstyledButton } from '@mantine/core';
import { SortIcon, LinkIcon, SearchIcon } from '../../Utils/Icons';
import LoadingWrapper from '../../Utils/Wrappers/LoadingWrapper';
import AppPagination from '../../Utils/Pagination/AppPagination';
import ErrorPage from '../../Utils/Errors/ErrorPage';

import { authHooks, sanPhamHooks } from '../../../graphql/queries';

interface Props {
    title: string;
}

const SanPhamList = ({ title }: Props) => {
    useDocumentTitle(title);
    const me = authHooks.useReadCurrentUser();
    const { search, debouncedSearch, setSearch } = useDebouncedSearchParams(300);
    const { currentPage, handlePageChange, limit, handleLimitChange } = usePagination();
    const [sortSanPham, toggleSortSoLuong] = useSortParams(
        {
            soLuong: [null, 'SO_LUONG_ASC', 'SO_LUONG_DESC']
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
            <td>{sanPham.isPublic ? 'Công khai' : 'Không công khai'}</td>
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
            <TextInput
                label='Tìm kiếm'
                placeholder='Tìm kiếm sản phẩm'
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
                                Tình trạng
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
        </LoadingWrapper>
    );
};

export default SanPhamList;