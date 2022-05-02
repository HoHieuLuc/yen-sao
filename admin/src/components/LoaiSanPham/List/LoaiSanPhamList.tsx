import { useQuery } from '@apollo/client';
import { useModals } from '@mantine/modals';
import { useDebouncedSearchParams, usePagination } from '../../../hooks';

import {
    Center,
    Grid,
    Pagination,
    TextInput,
} from '@mantine/core';

import ErrorPage from '../../Utils/Errors/ErrorPage';
import LoadingWrapper from '../../Utils/Wrappers/LoadingWrapper';
import EditLoaiSanPham from '../Edit/EditLoaiSanPham';
import LoaiSanPhamItem from './LoaiSanPhamItem';
import DeleteLoaiSanPham from '../Delete/DeleteLoaiSanPham';
import SearchIcon from '../../Utils/Icons/SearchIcon';

import { LoaiSanPham, PageInfo, PaginateVars } from '../../../types';
import { loaiSanPhamQuery } from '../../../graphql/queries';

interface LoaiSanPhamsData {
    loaiSanPham: {
        all: {
            docs: Array<LoaiSanPham>;
            pageInfo: PageInfo;
        }
    }
}

interface SearchVars extends PaginateVars {
    search: string;
}

const LoaiSanPhamList = () => {
    const { search, debouncedSearch, setSearch } = useDebouncedSearchParams(300);
    const { currentPage, handlePageChange } = usePagination();

    const { data, loading, error } = useQuery<
        LoaiSanPhamsData, SearchVars
    >(loaiSanPhamQuery.ALL, {
        variables: {
            page: currentPage,
            limit: 6,
            search: debouncedSearch,
        }
    });

    const modals = useModals();

    const openEditModal = (loaiSanPham: LoaiSanPham) => {
        const modalId = modals.openModal({
            title: 'Chỉnh sửa',
            children:
                <EditLoaiSanPham
                    {...loaiSanPham}
                    closeModal={() => modals.closeModal(modalId)}
                />
        });
    };

    const openDeleteModal = (loaiSanPham: LoaiSanPham) => {
        const modalId = modals.openModal({
            title: <h3>Xóa loại sản phẩm</h3>,
            children: <DeleteLoaiSanPham
                loaiSanPham={loaiSanPham}
                closeModal={() => modals.closeModal(modalId)}
            />
        });
    };

    if (error) {
        return <ErrorPage />;
    }

    const loaiSanPhamElements = data?.loaiSanPham.all.docs.map(
        (loaiSanPham) => (
            <LoaiSanPhamItem
                key={loaiSanPham.id}
                loaiSanPham={loaiSanPham}
                openEditModal={openEditModal}
                openDeleteModal={openDeleteModal}
            />
        )
    );

    return (
        <LoadingWrapper loading={loading}>
            <TextInput
                label='Tìm kiếm'
                placeholder='Tên loại sản phẩm'
                rightSection={<SearchIcon />}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <Grid align='stretch' mt='sm'>
                {loaiSanPhamElements}
            </Grid>
            {data && <Center mt='sm'>
                <Pagination
                    total={data.loaiSanPham.all.pageInfo.totalPages}
                    siblings={1}
                    page={currentPage}
                    onChange={handlePageChange}
                />
            </Center>}
        </LoadingWrapper>
    );
};

export default LoaiSanPhamList;