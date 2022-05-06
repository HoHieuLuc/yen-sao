import { useDebouncedSearchParams, usePagination, useToggleSortParams } from '../../../hooks';
import { useQuery } from '@apollo/client';

import { Center, ScrollArea, Table, Text, TextInput, UnstyledButton } from '@mantine/core';
import { ArrowDown, ArrowsUpDown, ArrowUp, LinkIcon, SearchIcon } from '../../Utils/Icons';
import LoadingWrapper from '../../Utils/Wrappers/LoadingWrapper';
import MyPagination from '../../Utils/Pagination/MyPagination';
import ErrorPage from '../../Utils/Errors/ErrorPage';

import { LoaiSanPham, PageInfo, PaginateVars } from '../../../types';
import { sanPhamQuery } from '../../../graphql/queries';

interface SanPhamDoc {
    id: string;
    tenSanPham: string;
    soLuong: number;
    loaiSanPham: Omit<LoaiSanPham, 'moTa'>;
}

interface SanPhamsData {
    sanPham: {
        all: {
            docs: Array<SanPhamDoc>;
            pageInfo: PageInfo;
        }
    }
}

interface SearchVars extends PaginateVars {
    search: string;
    sort: string | null;
}

const SanPhamList = () => {
    const { search, debouncedSearch, setSearch } = useDebouncedSearchParams(300);
    const { currentPage, handlePageChange, limit, handleLimitChange } = usePagination();
    const [sort, toggleSort] = useToggleSortParams(['', 'SO_LUONG_ASC', 'SO_LUONG_DESC']);

    const { data, loading, error } = useQuery<
        SanPhamsData, SearchVars
    >(sanPhamQuery.ALL, {
        variables: {
            page: currentPage,
            limit: limit,
            search: debouncedSearch,
            sort: sort
        }
    });

    if (error) {
        return <ErrorPage />;
    }

    const sanPhamElements = data?.sanPham.all.docs.map((sanPham, index) => (
        <tr key={sanPham.id}>
            <td>{10 * (currentPage - 1) + (index + 1)}</td>
            <td style={{ width: '50%' }}>
                <Text lineClamp={1}>
                    {sanPham.tenSanPham}
                </Text>
            </td>
            <td>{sanPham.soLuong}</td>
            <td>{sanPham.loaiSanPham.tenLoaiSanPham}</td>
            <td>
                <Center>
                    <LinkIcon
                        to={`/san-pham/${sanPham.id}/sua`}
                        label='Sửa'
                        iconType='edit'
                        color='green'
                    />
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
                                <UnstyledButton onClick={() => toggleSort()}>
                                    Số lượng còn {
                                        sort === null
                                            ? <ArrowsUpDown />
                                            : sort === 'SO_LUONG_ASC'
                                                ? <ArrowUp />
                                                : <ArrowDown />
                                    }
                                </UnstyledButton>
                            </th>
                            <th>Loại sản phẩm</th>
                            <th>Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sanPhamElements}
                    </tbody>
                </Table>
            </ScrollArea>
            {data && (
                <MyPagination
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