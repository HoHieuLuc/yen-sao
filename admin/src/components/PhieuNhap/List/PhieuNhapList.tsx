import { useQuery } from '@apollo/client';
import { Center, Pagination, Table } from '@mantine/core';
import { phieuNhapQuery } from '../../../graphql/queries';
import { PageInfo, PaginateVars, User } from '../../../types';
import ErrorPage from '../../Utils/Errors/ErrorPage';
import LoadingWrapper from '../../Utils/Wrappers/LoadingWrapper';
import PhieuNhapItem from './PhieuNhapItem';

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

const PhieuNhapList = () => {
    const { data, loading, error } = useQuery<
        PhieuNhapsData, PaginateVars
    >(phieuNhapQuery.ALL, {
        variables: {
            page: 1,
            limit: 10
        }
    });

    if (error) {
        return <ErrorPage />;
    }

    const phieuNhapElements = data?.phieuNhap.all.docs.map(phieuNhap => (
        <PhieuNhapItem 
            key={phieuNhap.id}
            phieuNhap={phieuNhap}
        />
    ));

    return (
        <LoadingWrapper loading={loading}>
            <Table striped highlightOnHover mb='sm'>
                <thead>
                    <tr>
                        <th>Người nhập</th>
                        <th>Ngày nhập</th>
                        <th>Số mặt hàng nhập</th>
                        <th>Tổng tiền</th>
                        <th>Chức năng</th>
                    </tr>
                </thead>
                <tbody>
                    {phieuNhapElements}
                </tbody>
            </Table>
            {data && (
                <Center>
                    <Pagination
                        total={data.phieuNhap.all.pageInfo.totalPages}
                        siblings={1}
                        page={1}
                        onChange={void (0)}
                    />
                </Center>
            )}
        </LoadingWrapper>
    );
};

export default PhieuNhapList;