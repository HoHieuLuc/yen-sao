import { useQuery } from '@apollo/client';
import { useSearchParams } from 'react-router-dom';
import { useModals } from '@mantine/modals';
import { FormEvent, useState } from 'react';

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
import { ALL_LOAI_SAN_PHAMS } from '../../../graphql/queries';

interface LoaiSanPhamsData {
    loaiSanPham: {
        all: {
            loaiSanPhams: Array<LoaiSanPham>;
            pageInfo: PageInfo;
        }
    }
}

interface SearchVars extends PaginateVars {
    search: string;
}

const LoaiSanPhamList = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = useState(searchParams.get('search') || '');
    const currentPage = parseInt(searchParams.get('page') || '1');
    const { data, loading, error } = useQuery<
        LoaiSanPhamsData, SearchVars
    >(ALL_LOAI_SAN_PHAMS, {
        variables: {
            page: currentPage,
            limit: 6,
            search: searchParams.get('search') || '',
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

    const handlePageChange = (page: number) => {
        setSearchParams({
            page: page.toString()
        });
    };

    const handleSearch = (event: FormEvent) => {
        event.preventDefault();
        setSearchParams({
            search,
        });
    };

    if (error) {
        return <ErrorPage />;
    }

    const loaiSanPhamElements = data?.loaiSanPham.all.loaiSanPhams.map(
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
            <>
                <form onSubmit={handleSearch}>
                    <TextInput
                        label='Tìm kiếm'
                        placeholder='Tên loại sản phẩm'
                        rightSection={<SearchIcon />}
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                    />
                </form>
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
            </>
        </LoadingWrapper>
    );
};

export default LoaiSanPhamList;