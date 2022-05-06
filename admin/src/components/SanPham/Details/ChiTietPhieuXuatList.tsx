import { usePagination } from '../../../hooks';
import { useQuery } from '@apollo/client';

import LoadingWrapper from '../../Utils/Wrappers/LoadingWrapper';
import MyPagination from '../../Utils/Pagination/MyPagination';
import ErrorPage from '../../Utils/Errors/ErrorPage';
import { Anchor, Box, Table } from '@mantine/core';
import { Link } from 'react-router-dom';

import { convertToShortDate, convertToVND } from '../../../utils/common';
import { ChiTietPhieuXuat, PageInfo, PaginateVars } from '../../../types';
import { chiTietPhieuXuatQuery } from '../../../graphql/queries';

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
}

interface Props {
    id: string;
    isOpened: boolean;
}

const ChiTietPhieuXuatList = ({ id, isOpened }: Props) => {
    const { currentPage, handlePageChange, limit, handleLimitChange } = usePagination();
    const { data, loading, error } = useQuery<
        ChiTietData, ChiTietVars
    >(chiTietPhieuXuatQuery.BY_SAN_PHAM_ID, {
        variables: {
            id,
            page: currentPage,
            limit: limit
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
            {data && <Box>
                <Table striped highlightOnHover mb='sm'>
                    <thead>
                        <tr style={{ whiteSpace: 'nowrap' }}>
                            <th>STT</th>
                            <th>Ngày xuất</th>
                            <th>Số lượng xuất</th>
                            <th>Đơn giá xuất</th>
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