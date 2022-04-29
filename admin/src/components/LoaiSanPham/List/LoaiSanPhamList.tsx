import { useQuery } from '@apollo/client';
import { useSearchParams } from 'react-router-dom';
import { useModals } from '@mantine/modals';

import {
    Center,
    Grid,
    Pagination,
} from '@mantine/core';

import { LoaiSanPham, PageInfo, PaginateVars } from '../../../types';
import { ALL_LOAI_SAN_PHAMS } from '../../../graphql/queries';

import ErrorPage from '../../Errors/ErrorPage';
import LoadingWrapper from '../../Wrapper/LoadingWrapper';
import EditLoaiSanPham from '../Edit/EditLoaiSanPham';
import LoaiSanPhamItem from './LoaiSanPhamItem';
import DeleteLoaiSanPham from '../Delete/DeleteLoaiSanPham';

interface LoaiSanPhamsData {
    loaiSanPham: {
        all: {
            loaiSanPhams: Array<LoaiSanPham>;
            pageInfo: PageInfo;
        }
    }
}

const LoaiSanPhamList = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get('page') || '1');
    const { data, loading, error } = useQuery<
        LoaiSanPhamsData, PaginateVars
    >(ALL_LOAI_SAN_PHAMS, {
        variables: {
            page: currentPage,
            limit: 6,
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
                <Grid align='stretch'>
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