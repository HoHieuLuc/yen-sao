import { useDateRangeSearchParams, usePagination, useSortParams } from '../../../hooks';
import { useQuery } from '@apollo/client';

import { Anchor, Box, Table, UnstyledButton } from '@mantine/core';
import LoadingWrapper from '../../Utils/Wrappers/LoadingWrapper';
import DateRangeSearch from '../../Utils/Search/DateRangeSearch';
import MyPagination from '../../Utils/Pagination/MyPagination';
import ErrorPage from '../../Utils/Errors/ErrorPage';
import { Link } from 'react-router-dom';

import { ChiTietPhieuXuat, PageInfo, PaginateVars } from '../../../types';
import { convertToShortDate, convertToVND } from '../../../utils/common';
import { chiTietPhieuXuatQuery } from '../../../graphql/queries';
import { SortIcon } from '../../Utils/Icons';

interface ChiTietData {
    chiTietPhieuXuat: {
        bySanPhamID: {
            docs: Array<Omit<ChiTietPhieuXuat, 'sanPham'>>;
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

const ChiTietPhieuXuatList = ({ id, isOpened }: Props) => {
    const { currentPage, handlePageChange, limit, handleLimitChange } = usePagination();
    const { from, to, handleSearch } = useDateRangeSearchParams();
    const [sortChiTietPhieuXuat, toggleSortChiTietPhieuXuat] = useSortParams({
        ngayXuat: [null, 'NGAY_XUAT_ASC', 'NGAY_XUAT_DESC'],
        soLuong: [null, 'SO_LUONG_ASC', 'SO_LUONG_DESC'],
        donGia: [null, 'DON_GIA_ASC', 'DON_GIA_DESC'],
    });
    const { data, loading, error } = useQuery<
        ChiTietData, ChiTietVars
    >(chiTietPhieuXuatQuery.BY_SAN_PHAM_ID, {
        variables: {
            id,
            page: currentPage,
            limit: limit,
            from: from.paramValue,
            to: to.paramValue,
            sort: sortChiTietPhieuXuat.currentSortValue
        },
        skip: !isOpened,
        fetchPolicy: 'cache-and-network',
    });

    if (error) {
        return <ErrorPage />;
    }

    const chiTietElements = data?.chiTietPhieuXuat.bySanPhamID.docs.map((chiTiet, index) => (
        <tr key={chiTiet.id}>
            <td>{10 * (1 - 1) + (index + 1)}</td>
            <td>
                <Anchor component={Link} to={`/phieu-xuat/${chiTiet.maPhieuXuat}`}>
                    {convertToShortDate(chiTiet.createdAt)}
                </Anchor>
            </td>
            <td>{chiTiet.soLuongXuat}</td>
            <td>{convertToVND(chiTiet.donGiaXuat)}</td>
            <td>{convertToVND(chiTiet.soLuongXuat * chiTiet.donGiaXuat)}</td>
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
                                    onClick={() => toggleSortChiTietPhieuXuat('ngayXuat')}
                                >
                                    Ngày xuất <SortIcon
                                        currentSort={sortChiTietPhieuXuat.currentSortValue}
                                        ascValue='NGAY_XUAT_ASC'
                                        descValue='NGAY_XUAT_DESC'
                                    />
                                </UnstyledButton>
                            </th>
                            <th>
                                <UnstyledButton
                                    onClick={() => toggleSortChiTietPhieuXuat('soLuong')}
                                >
                                    Số lượng xuất <SortIcon
                                        currentSort={sortChiTietPhieuXuat.currentSortValue}
                                        ascValue='SO_LUONG_ASC'
                                        descValue='SO_LUONG_DESC'
                                    />
                                </UnstyledButton>
                            </th>
                            <th>
                                <UnstyledButton
                                    onClick={() => toggleSortChiTietPhieuXuat('donGia')}
                                >
                                    Đơn giá xuất <SortIcon
                                        currentSort={sortChiTietPhieuXuat.currentSortValue}
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
                    total={data.chiTietPhieuXuat.bySanPhamID.pageInfo.totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    limit={limit.toString()}
                    onLimitChange={handleLimitChange}
                />
            </Box>}
        </LoadingWrapper>
    );
};

export default ChiTietPhieuXuatList;