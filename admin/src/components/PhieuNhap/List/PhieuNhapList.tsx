import { useQuery } from '@apollo/client';
import { usePagination } from '../../../hooks';
import { useDateRangeSearchParams } from '../../../hooks/use-date-range-search-params';

import { Button, Center, Grid, Pagination, ScrollArea, Table } from '@mantine/core';
import ErrorPage from '../../Utils/Errors/ErrorPage';
import LoadingWrapper from '../../Utils/Wrappers/LoadingWrapper';
import PhieuNhapItem from './PhieuNhapItem';
import { DatePicker } from '@mantine/dates';
import SearchIcon from '../../Utils/Icons/SearchIcon';

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
}

const PhieuNhapList = () => {
    const { currentPage, handlePageChange } = usePagination();
    const { from, to, handleSearch } = useDateRangeSearchParams();

    const { data, loading, error } = useQuery<
        PhieuNhapsData, PhieuNhapVars
    >(phieuNhapQuery.ALL, {
        variables: {
            page: currentPage,
            limit: 10,
            from: from.paramValue,
            to: to.paramValue
        }
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
                            <th>Ngày nhập</th>
                            <th>Số mặt hàng nhập</th>
                            <th>Tổng tiền</th>
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
                <Center>
                    <Pagination
                        total={data.phieuNhap.all.pageInfo.totalPages}
                        siblings={1}
                        page={currentPage}
                        onChange={handlePageChange}
                    />
                </Center>
            )}
        </LoadingWrapper>
    );
};

export default PhieuNhapList;