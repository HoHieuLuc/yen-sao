import { useDateRangeSearchParams } from '../../../hooks/use-date-range-search-params';
import { usePagination, useSortParams } from '../../../hooks';
import { useQuery } from '@apollo/client';

import { Button, Center, Grid, ScrollArea, Table, UnstyledButton } from '@mantine/core';
import LoadingWrapper from '../../Utils/Wrappers/LoadingWrapper';
import MyPagination from '../../Utils/Pagination/MyPagination';
import ErrorPage from '../../Utils/Errors/ErrorPage';
import { SearchIcon, SortIcon } from '../../Utils/Icons';
import PhieuXuatItem from './PhieuXuatItem';
import { DatePicker } from '@mantine/dates';

import { PageInfo, PaginateVars, User } from '../../../types';
import { phieuXuatQuery } from '../../../graphql/queries';
import dayjs from 'dayjs';

export interface PhieuXuatDoc {
    id: string;
    nguoiXuat: Omit<User, 'email' | 'fullname' | 'role'>;
    createdAt: number;
    soMatHangXuat: number;
    tongTien: number;
}

interface PhieuXuatsData {
    phieuXuat: {
        all: {
            docs: Array<PhieuXuatDoc>;
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
            <Grid justify='center' mb='md' align='end'>
                <Grid.Col md={4}>
                    <DatePicker
                        label='Từ ngày'
                        placeholder='Chọn ngày'
                        value={from.value}
                        onChange={from.onChange}
                        maxDate={
                            dayjs(to.value).subtract(1, 'd').toDate() ?? undefined
                        }
                    />
                </Grid.Col>
                <Grid.Col md={4}>
                    <DatePicker
                        label='Đến ngày'
                        placeholder='Chọn ngày'
                        value={to.value}
                        onChange={to.onChange}
                        minDate={
                            dayjs(from.value).add(1, 'd').toDate() ?? undefined
                        }
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
                            <th>Người xuất</th>
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