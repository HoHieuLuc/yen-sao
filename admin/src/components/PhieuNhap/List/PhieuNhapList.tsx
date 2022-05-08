import { useDateRangeSearchParams } from '../../../hooks/use-date-range-search-params';
import { usePagination, useSortParams } from '../../../hooks';
import { useQuery } from '@apollo/client';

import { Button, Center, Grid, ScrollArea, Table, UnstyledButton } from '@mantine/core';
import LoadingWrapper from '../../Utils/Wrappers/LoadingWrapper';
import MyPagination from '../../Utils/Pagination/MyPagination';
import ErrorPage from '../../Utils/Errors/ErrorPage';
import { SearchIcon, SortIcon } from '../../Utils/Icons';
import PhieuNhapItem from './PhieuNhapItem';
import { DatePicker } from '@mantine/dates';

import { PageInfo, PaginateVars, User } from '../../../types';
import { phieuNhapQuery } from '../../../graphql/queries';
import dayjs from 'dayjs';

export interface PhieuNhapDoc {
    id: string;
    nguoiNhap: Omit<User, 'email' | 'fullname' | 'role'>;
    createdAt: number;
    soMatHangNhap: number;
    tongTien: number;
}

interface PhieuNhapsData {
    phieuNhap: {
        all: {
            docs: Array<PhieuNhapDoc>;
            pageInfo: PageInfo;
        }
    }
}

interface PhieuNhapVars extends PaginateVars {
    from: number | null;
    to: number | null;
    sort: string | null;
}

const PhieuNhapList = () => {
    const { currentPage, handlePageChange, limit, handleLimitChange } = usePagination();
    const { from, to, handleSearch } = useDateRangeSearchParams();
    const [sortPhieuNhap, toggleSortPhieuNhap] = useSortParams({
        ngayNhap: [null, 'NGAY_NHAP_ASC', 'NGAY_NHAP_DESC'],
        tongTien: [null, 'TONG_TIEN_ASC', 'TONG_TIEN_DESC'],
    });

    const { data, loading, error } = useQuery<
        PhieuNhapsData, PhieuNhapVars
    >(phieuNhapQuery.ALL, {
        variables: {
            page: currentPage,
            limit: limit,
            from: from.paramValue,
            to: to.paramValue,
            sort: sortPhieuNhap.currentSortValue
        },
        fetchPolicy: 'cache-and-network'
    });

    if (error) {
        return <ErrorPage />;
    }

    const phieuNhapElements = data?.phieuNhap.all.docs.map((phieuNhap, index) => (
        <PhieuNhapItem
            key={phieuNhap.id}
            phieuNhap={phieuNhap}
            index={10 * (currentPage - 1) + (index + 1)}
        />
    ));

    return (
        <LoadingWrapper loading={loading}>
            <Grid justify='center' mb='md' align='end'>
                <Grid.Col md={4}>
                    <DatePicker
                        label='Từ ngày'
                        placeholder='Chọn ngày'
                        value={from.value}
                        onChange={from.onChange}
                        maxDate={dayjs(to.value).subtract(1, 'd').toDate() ?? undefined}
                    />
                </Grid.Col>
                <Grid.Col md={4}>
                    <DatePicker
                        label='Đến ngày'
                        placeholder='Chọn ngày'
                        value={to.value}
                        onChange={to.onChange}
                        minDate={dayjs(from.value).add(1, 'd').toDate() ?? undefined}
                    />
                </Grid.Col>
                <Grid.Col md={2}>
                    <Button onClick={handleSearch} rightIcon={<SearchIcon />}>
                        Tìm kiếm
                    </Button>
                </Grid.Col>
            </Grid>
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
                <MyPagination
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