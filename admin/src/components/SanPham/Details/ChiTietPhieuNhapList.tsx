import { useDateRangeSearchParams, usePagination, useSortParams } from '../../../hooks';
import { useQuery } from '@apollo/client';

import { Anchor, Box, Table, UnstyledButton } from '@mantine/core';
import LoadingWrapper from '../../Utils/Wrappers/LoadingWrapper';
import DateRangeSearch from '../../Utils/Search/DateRangeSearch';
import MyPagination from '../../Utils/Pagination/MyPagination';
import ErrorPage from '../../Utils/Errors/ErrorPage';
import { Link } from 'react-router-dom';

import { ChiTietPhieuNhap, PageInfo, PaginateVars } from '../../../types';
import { convertToShortDate, convertToVND } from '../../../utils/common';
import { chiTietPhieuNhapQuery } from '../../../graphql/queries';
import { SortIcon } from '../../Utils/Icons';

interface ChiTietData {
    chiTietPhieuNhap: {
        bySanPhamID: {
            docs: Array<Omit<ChiTietPhieuNhap, 'sanPham'>>;
            pageInfo: PageInfo;
        }
    }
}

interface ChiTietVars extends PaginateVars {
    id: string;
    from: number | null;
    to: number | null;
    sort: string | null;
}

interface Props {
    id: string;
    isOpened: boolean;
}

const ChiTietPhieuNhapList = ({ id, isOpened }: Props) => {
    const { currentPage, handlePageChange, limit, handleLimitChange } = usePagination();
    const { from, to, handleSearch } = useDateRangeSearchParams();
    const [sortChiTietPhieuNhap, toggleSortChiTietPhieuNhap] = useSortParams({
        ngayNhap: [null, 'NGAY_NHAP_ASC', 'NGAY_NHAP_DESC'],
        soLuong: [null, 'SO_LUONG_ASC', 'SO_LUONG_DESC'],
        donGia: [null, 'DON_GIA_ASC', 'DON_GIA_DESC'],
    });
    const { data, loading, error } = useQuery<
        ChiTietData, ChiTietVars
    >(chiTietPhieuNhapQuery.BY_SAN_PHAM_ID, {
        variables: {
            id,
            page: currentPage,
            limit: limit,
            from: from.paramValue,
            to: to.paramValue,
            sort: sortChiTietPhieuNhap.currentSortValue,
        },
        skip: !isOpened,
        fetchPolicy: 'cache-and-network',
    });

    if (error) {
        return <ErrorPage />;
    }

    const chiTietElements = data?.chiTietPhieuNhap.bySanPhamID.docs.map((chiTiet, index) => (
        <tr key={chiTiet.id}>
            <td>{10 * (1 - 1) + (index + 1)}</td>
            <td>
                <Anchor component={Link} to={`/phieu-nhap/${chiTiet.maPhieuNhap}`}>
                    {convertToShortDate(chiTiet.ngayNhap)}
                </Anchor>
            </td>
            <td>{chiTiet.soLuongNhap / 1000}</td>
            <td>{convertToVND(chiTiet.donGiaNhap)}</td>
            <td>{convertToVND(chiTiet.thanhTien)}</td>
        </tr>
    ));

    return (
        <LoadingWrapper loading={loading}>
            <DateRangeSearch
                from={from}
                to={to}
                handleSearch={handleSearch}
            />
            {data && <Box>
                <Table striped highlightOnHover mb='sm'>
                    <thead>
                        <tr style={{ whiteSpace: 'nowrap' }}>
                            <th>STT</th>
                            <th>
                                <UnstyledButton
                                    onClick={() => toggleSortChiTietPhieuNhap('ngayNhap')}
                                >
                                    Ngày nhập <SortIcon 
                                        currentSort={sortChiTietPhieuNhap.currentSortValue}
                                        ascValue='NGAY_NHAP_ASC'
                                        descValue='NGAY_NHAP_DESC'
                                    />
                                </UnstyledButton>
                            </th>
                            <th>
                                <UnstyledButton
                                    onClick={() => toggleSortChiTietPhieuNhap('soLuong')}
                                >
                                    Số lượng (kg) <SortIcon
                                        currentSort={sortChiTietPhieuNhap.currentSortValue}
                                        ascValue='SO_LUONG_ASC'
                                        descValue='SO_LUONG_DESC'
                                    />
                                </UnstyledButton>
                            </th>
                            <th>
                                <UnstyledButton
                                    onClick={() => toggleSortChiTietPhieuNhap('donGia')}
                                >
                                    Đơn giá <SortIcon
                                        currentSort={sortChiTietPhieuNhap.currentSortValue}
                                        ascValue='DON_GIA_ASC'
                                        descValue='DON_GIA_DESC'
                                    />
                                </UnstyledButton>
                            </th>
                            <th>Thành tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        {chiTietElements}
                    </tbody>
                </Table>
                <MyPagination
                    total={data.chiTietPhieuNhap.bySanPhamID.pageInfo.totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    limit={limit.toString()}
                    onLimitChange={handleLimitChange}
                />
            </Box>}
        </LoadingWrapper>
    );
};

export default ChiTietPhieuNhapList;