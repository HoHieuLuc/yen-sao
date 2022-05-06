import { useQuery } from '@apollo/client';
import { useDebouncedSearchParams, usePagination } from '../../../hooks';

import { Center, ScrollArea, Table, Text, TextInput } from '@mantine/core';
import ErrorPage from '../../Utils/Errors/ErrorPage';
import LinkIcon from '../../Utils/Icons/LinkIcon';
import SearchIcon from '../../Utils/Icons/SearchIcon';
import LoadingWrapper from '../../Utils/Wrappers/LoadingWrapper';

import { sanPhamQuery } from '../../../graphql/queries';
import { LoaiSanPham, PageInfo, PaginateVars } from '../../../types';
import MyPagination from '../../Utils/Pagination/MyPagination';

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
}

const SanPhamList = () => {
    const { search, debouncedSearch, setSearch } = useDebouncedSearchParams(300);
    const { currentPage, handlePageChange, limit, handleLimitChange } = usePagination();    

    const { data, loading, error } = useQuery<
        SanPhamsData, SearchVars
    >(sanPhamQuery.ALL, {
        variables: {
            page: currentPage,
            limit: limit,
            search: debouncedSearch
        }
    });

    if (error) {
        return <ErrorPage />;
    }

    const sanPhamElements = data?.sanPham.all.docs.map((sanPham, index) => (
        <tr key={sanPham.id}>
            <td>{10 * (currentPage - 1) + (index + 1)}</td>
            <td>
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
                            <th>Tên sản phẩm</th>
                            <th>Số lượng còn</th>
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