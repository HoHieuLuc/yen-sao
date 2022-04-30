import { useQuery } from '@apollo/client';
import { useDebouncedSearchParams } from '../../../hooks';
import { useSearchParams } from 'react-router-dom';

import { Center, Pagination, Table, TextInput } from '@mantine/core';
import ErrorPage from '../../Utils/Errors/ErrorPage';
import LinkIcon from '../../Utils/Icons/LinkIcon';
import SearchIcon from '../../Utils/Icons/SearchIcon';
import LoadingWrapper from '../../Utils/Wrappers/LoadingWrapper';

import { sanPhamQuery } from '../../../graphql/queries';
import { LoaiSanPham, PageInfo, PaginateVars } from '../../../types';

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
    const [searchParams, setSearchParams] = useSearchParams();
    const { search, debouncedSearch, setSearch } = useDebouncedSearchParams(300);

    const currentPage = parseInt(searchParams.get('page') || '1');

    const { data, loading, error } = useQuery<
        SanPhamsData, SearchVars
    >(sanPhamQuery.ALL, {
        variables: {
            page: currentPage,
            limit: 10,
            search: debouncedSearch
        }
    });

    if (error) {
        return <ErrorPage />;
    }

    const sanPhamElements = data?.sanPham.all.docs.map(sanPham => (
        <tr key={sanPham.id}>
            <td>{sanPham.tenSanPham}</td>
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

    const handlePageChange = (page: number) => {
        searchParams.set('page', page.toString());
        setSearchParams(searchParams);
    };

    return (
        <LoadingWrapper loading={loading}><>
            <TextInput
                label='Tìm kiếm'
                placeholder='Tìm kiếm sản phẩm'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                rightSection={<SearchIcon />}
            />
            <Table striped highlightOnHover mb='sm'>
                <thead>
                    <tr>
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
            {data && (
                <Center>
                    <Pagination
                        total={data.sanPham.all.pageInfo.totalPages}
                        siblings={1}
                        page={currentPage}
                        onChange={handlePageChange}
                    />
                </Center>
            )}
        </></LoadingWrapper>
    );
};

export default SanPhamList;