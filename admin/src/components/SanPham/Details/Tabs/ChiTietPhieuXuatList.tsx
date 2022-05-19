import { useDateRangeSearchParams, usePagination, useSortParams } from '../../../../hooks';

import { Anchor, Box, Table, UnstyledButton } from '@mantine/core';
import LoadingWrapper from '../../../Utils/Wrappers/LoadingWrapper';
import DateRangeSearch from '../../../Utils/Search/DateRangeSearch';
import MyPagination from '../../../Utils/Pagination/MyPagination';
import ErrorPage from '../../../Utils/Errors/ErrorPage';
import { SortIcon } from '../../../Utils/Icons';
import { Link } from 'react-router-dom';

import { convertToShortDate, convertToVND } from '../../../../utils/common';
import { chiTietPhieuXuatHooks } from '../../../../graphql/queries';

interface Props {
    id: string;
}

const ChiTietPhieuXuatList = ({ id }: Props) => {
    const { currentPage, handlePageChange, limit, handleLimitChange } = usePagination();
    const { from, to, handleSearch } = useDateRangeSearchParams();
    const [sortChiTietPhieuXuat, toggleSortChiTietPhieuXuat] = useSortParams({
        ngayXuat: [null, 'NGAY_XUAT_ASC', 'NGAY_XUAT_DESC'],
        soLuong: [null, 'SO_LUONG_ASC', 'SO_LUONG_DESC'],
        donGia: [null, 'DON_GIA_ASC', 'DON_GIA_DESC'],
    });

    const { data, loading, error } = chiTietPhieuXuatHooks.useChiTietPhieuXuatBySanPhamID(
        {
            id,
            page: currentPage,
            limit: limit,
            from: from.paramValue,
            to: to.paramValue,
            sort: sortChiTietPhieuXuat.currentSortValue
        }
    );

    if (error) {
        return <ErrorPage />;
    }

    const chiTietElements = data?.chiTietPhieuXuat.bySanPhamID.docs.map(
        (chiTiet, index) => (
            <tr key={chiTiet.id}>
                <td>{limit * (currentPage - 1) + (index + 1)}</td>
                <td>
                    <Anchor component={Link} to={`/phieu-xuat/${chiTiet.maPhieuXuat}`}>
                        {convertToShortDate(chiTiet.ngayXuat)}
                    </Anchor>
                </td>
                <td>{chiTiet.soLuongXuat / 1000}</td>
                <td>{convertToVND(chiTiet.donGiaXuat)}</td>
                <td>{convertToVND(chiTiet.thanhTien)}</td>
            </tr>
        )
    );

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
                                    Số lượng (kg) <SortIcon
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