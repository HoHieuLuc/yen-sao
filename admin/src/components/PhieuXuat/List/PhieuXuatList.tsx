import { useQuery } from '@apollo/client';
import { usePagination } from '../../../hooks';
import { useDateRangeSearchParams } from '../../../hooks/use-date-range-search-params';

import { Button, Center, Grid, ScrollArea, Table } from '@mantine/core';
import ErrorPage from '../../Utils/Errors/ErrorPage';
import LoadingWrapper from '../../Utils/Wrappers/LoadingWrapper';
import PhieuXuatItem from './PhieuXuatItem';
import { DatePicker } from '@mantine/dates';
import SearchIcon from '../../Utils/Icons/SearchIcon';

import { PageInfo, PaginateVars, User } from '../../../types';
import { phieuXuatQuery } from '../../../graphql/queries';
import dayjs from 'dayjs';
import MyPagination from '../../Utils/Pagination/MyPagination';

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
}

const PhieuXuatList = () => {
    const { currentPage, handlePageChange, limit, handleLimitChange } = usePagination();
    const { from, to, handleSearch } = useDateRangeSearchParams();

    const { data, loading, error } = useQuery<
        PhieuXuatsData, PhieuXuatVars
    >(phieuXuatQuery.ALL, {
        variables: {
            page: currentPage,
            limit: limit,
            from: from.paramValue,
            to: to.paramValue
        }
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
                            <th>Người xuất</th>
                            <th>Ngày xuất</th>
                            <th>Số mặt hàng xuất</th>
                            <th>Tổng tiền</th>
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