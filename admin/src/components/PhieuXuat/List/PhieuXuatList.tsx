import { useDateRangeSearchParams } from '../../../hooks/use-date-range-search-params';
import { usePagination, useSortParams } from '../../../hooks';

import { Center, ScrollArea, Table, UnstyledButton } from '@mantine/core';
import LoadingWrapper from '../../Utils/Wrappers/LoadingWrapper';
import DateRangeSearch from '../../Utils/Search/DateRangeSearch';
import AppPagination from '../../Utils/Pagination/AppPagination';
import ErrorPage from '../../Utils/Errors/ErrorPage';
import { SortIcon } from '../../Utils/Icons';
import PhieuXuatItem from './PhieuXuatItem';

import { phieuXuatHooks } from '../../../graphql/queries';

const PhieuXuatList = () => {
    const { currentPage, handlePageChange, limit, handleLimitChange } = usePagination();
    const { from, to, handleSearch } = useDateRangeSearchParams();
    const [sortPhieuXuat, toggleSortPhieuXuat] = useSortParams({
        ngayXuat: [null, 'NGAY_XUAT_ASC', 'NGAY_XUAT_DESC'],
        tongTien: [null, 'TONG_TIEN_ASC', 'TONG_TIEN_DESC'],
    });

    const { data, loading, error } = phieuXuatHooks.useAllPhieuXuats({
        page: currentPage,
        limit: limit,
        from: from.paramValue,
        to: to.paramValue,
        sort: sortPhieuXuat.currentSortValue
    });

    if (error) {
        return <ErrorPage />;
    }

    const phieuXuatElements = data?.phieuXuat.all.docs.map((phieuXuat, index) => (
        <PhieuXuatItem
            key={phieuXuat.id}
            phieuXuat={phieuXuat}
            index={limit * (currentPage - 1) + (index + 1)}
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
                            <th>Tình trạng</th>
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
                <AppPagination
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