import { useDateRangeSearchParams } from '../../../hooks/use-date-range-search-params';
import { usePagination, useSortParams } from '../../../hooks';
import { useDocumentTitle } from '@mantine/hooks';

import { Center, ScrollArea, Table, UnstyledButton } from '@mantine/core';
import LoadingWrapper from '../../Utils/Wrappers/LoadingWrapper';
import DateRangeSearch from '../../Utils/Search/DateRangeSearch';
import AppPagination from '../../Utils/Pagination/AppPagination';
import ErrorPage from '../../Utils/Errors/ErrorPage';
import { SortIcon } from '../../Utils/Icons';
import PhieuNhapItem from './PhieuNhapItem';

import { phieuNhapHooks } from '../../../graphql/queries';

interface Props {
    title: string;
}

const PhieuNhapList = ({ title }: Props) => {
    useDocumentTitle(title);
    const { currentPage, handlePageChange, limit, handleLimitChange } = usePagination();
    const { from, to, handleSearch } = useDateRangeSearchParams();
    const [sortPhieuNhap, toggleSortPhieuNhap] = useSortParams({
        ngayNhap: [null, 'NGAY_NHAP_ASC', 'NGAY_NHAP_DESC'],
        tongTien: [null, 'TONG_TIEN_ASC', 'TONG_TIEN_DESC'],
    });

    const { data, loading, error } = phieuNhapHooks.useAllPhieuNhaps({
        page: currentPage,
        limit: limit,
        from: from.paramValue,
        to: to.paramValue,
        sort: sortPhieuNhap.currentSortValue
    });

    if (error) {
        return <ErrorPage />;
    }

    const phieuNhapElements = data?.phieuNhap.all.docs.map((phieuNhap, index) => (
        <PhieuNhapItem
            key={phieuNhap.id}
            phieuNhap={phieuNhap}
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
                            <th>Người nhập</th>
                            <th>
                                <UnstyledButton
                                    onClick={() => toggleSortPhieuNhap('ngayNhap')}
                                >
                                    Ngày nhập <SortIcon
                                        currentSort={sortPhieuNhap.currentSortValue}
                                        ascValue='NGAY_NHAP_ASC'
                                        descValue='NGAY_NHAP_DESC'
                                    />
                                </UnstyledButton>
                            </th>
                            <th>Số mặt hàng nhập</th>
                            <th>
                                <UnstyledButton
                                    onClick={() => toggleSortPhieuNhap('tongTien')}
                                >
                                    Tổng tiền <SortIcon
                                        currentSort={sortPhieuNhap.currentSortValue}
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
                        {phieuNhapElements}
                    </tbody>
                </Table>
            </ScrollArea>
            {data && (
                <AppPagination
                    total={data.phieuNhap.all.pageInfo.totalPages}
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

export default PhieuNhapList;