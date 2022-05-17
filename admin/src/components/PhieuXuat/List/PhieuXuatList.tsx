import { useDateRangeSearchParams } from '../../../hooks/use-date-range-search-params';
import { usePagination, useSortParams } from '../../../hooks';
import { useQuery } from '@apollo/client';

import { Center, ScrollArea, Table, UnstyledButton } from '@mantine/core';
import LoadingWrapper from '../../Utils/Wrappers/LoadingWrapper';
import DateRangeSearch from '../../Utils/Search/DateRangeSearch';
import MyPagination from '../../Utils/Pagination/MyPagination';
import ErrorPage from '../../Utils/Errors/ErrorPage';
import { SortIcon } from '../../Utils/Icons';
import PhieuXuatItem from './PhieuXuatItem';

import { PageInfo, PaginateVars, PhieuXuat } from '../../../types';
import { phieuXuatQuery } from '../../../graphql/queries';

export interface PhieuXuatsData {
    phieuXuat: {
        all: {
            docs: Array<PhieuXuat>;
            pageInfo: PageInfo;
        }
    }
}

interface PhieuXuatVars extends PaginateVars {
    from: number | null;
    to: number | null;
    sort: string | null;
}

const PhieuXuatList = () => {
    const { currentPage, handlePageChange, limit, handleLimitChange } = usePagination();
    const { from, to, handleSearch } = useDateRangeSearchParams();
    const [sortPhieuXuat, toggleSortPhieuXuat] = useSortParams({
        ngayXuat: [null, 'NGAY_XUAT_ASC', 'NGAY_XUAT_DESC'],
        tongTien: [null, 'TONG_TIEN_ASC', 'TONG_TIEN_DESC'],
    });

    const { data, loading, error } = useQuery<
        PhieuXuatsData, PhieuXuatVars
    >(phieuXuatQuery.ALL, {
        variables: {
            page: currentPage,
            limit: limit,
            from: from.paramValue,
            to: to.paramValue,
            sort: sortPhieuXuat.currentSortValue
        },
        fetchPolicy: 'cache-and-network'
    });

    if (error) {
        return <ErrorPage />;
    }

    const phieuXuatElements = data?.phieuXuat.all.docs.map((phieuXuat, index) => (
        <PhieuXuatItem
            key={phieuXuat.id}
            phieuXuat={phieuXuat}
            index={10 * (currentPage - 1) + (index + 1)}
        />
    ));

    return (
        <LoadingWrapper loading={loading}>
            <DateRangeSearch 
                from={from}
                to={to}
                handleSearch={handleSearch}
            />
            <ScrollArea style={{ whiteSpace: 'break-spaces' }}>
                <Table striped highlightOnHover mb='sm'>
                    <thead>
                        <tr style={{ whiteSpace: 'nowrap' }}>
                            <th>STT</th>
                            <th>Người xuất</th>
                            <th>Người mua</th>
                            <th>
                                <UnstyledButton
                                    onClick={() => toggleSortPhieuXuat('ngayXuat')}
                                >
                                    Ngày xuất <SortIcon
                                        currentSort={sortPhieuXuat.currentSortValue}
                                        ascValue='NGAY_XUAT_ASC'
                                        descValue='NGAY_XUAT_DESC'
                                    />
                                </UnstyledButton>
                            </th>
                            <th>Số mặt hàng xuất</th>
                            <th>
                                <UnstyledButton
                                    onClick={() => toggleSortPhieuXuat('tongTien')}
                                >
                                    Tổng tiền <SortIcon
                                        currentSort={sortPhieuXuat.currentSortValue}
                                        ascValue='TONG_TIEN_ASC'
                                        descValue='TONG_TIEN_DESC'
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
                        {phieuXuatElements}
                    </tbody>
                </Table>
            </ScrollArea>
            {data && (
                <MyPagination
                    total={data.phieuXuat.all.pageInfo.totalPages}
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

export default PhieuXuatList;