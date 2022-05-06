import { usePagination } from '../../../hooks';
import { useQuery } from '@apollo/client';

import LoadingWrapper from '../../Utils/Wrappers/LoadingWrapper';
import MyPagination from '../../Utils/Pagination/MyPagination';
import ErrorPage from '../../Utils/Errors/ErrorPage';
import { Anchor, Box, Table } from '@mantine/core';
import { Link } from 'react-router-dom';

import { ChiTietPhieuNhap, PageInfo, PaginateVars } from '../../../types';
import { convertToShortDate, convertToVND } from '../../../utils/common';
import { chiTietPhieuNhapQuery } from '../../../graphql/queries';

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
}

interface Props {
    id: string;
    isOpened: boolean;
}

const ChiTietPhieuNhapList = ({ id, isOpened }: Props) => {
    const { currentPage, handlePageChange, limit, handleLimitChange } = usePagination();
    const { data, loading, error } = useQuery<
        ChiTietData, ChiTietVars
    >(chiTietPhieuNhapQuery.BY_SAN_PHAM_ID, {
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

    const chiTietElements = data?.chiTietPhieuNhap.bySanPhamID.docs.map((chiTiet, index) => (
        <tr key={chiTiet.id}>
            <td>{10 * (1 - 1) + (index + 1)}</td>
            <td>
                <Anchor component={Link} to={`/phieu-nhap/${chiTiet.maPhieuNhap}`}>
                    {convertToShortDate(chiTiet.createdAt)}
                </Anchor>
            </td>
            <td>{chiTiet.soLuongNhap}</td>
            <td>{chiTiet.donGiaNhap}</td>
            <td>{convertToVND(chiTiet.soLuongNhap * chiTiet.donGiaNhap)}</td>
        </tr>
    ));

    return (
        <LoadingWrapper loading={loading}>
            {data && <Box>
                <Table striped highlightOnHover mb='sm'>
                    <thead>
                        <tr style={{ whiteSpace: 'nowrap' }}>
                            <th>STT</th>
                            <th>Ngày nhập</th>
                            <th>Số lượng nhập</th>
                            <th>Đơn giá nhập</th>
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