import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import CreateChiTietPhieuXuat from '../Create/CreateChiTietPhieuXuat';
import LoadingWrapper from '../../Utils/Wrappers/LoadingWrapper';
import { Box, Center, Divider, Title } from '@mantine/core';
import EditChiTietPhieuXuat from './EditChiTietPhieuXuat';
import NotFound from '../../Utils/Errors/NotFound';
import EditPhieuXuat from './EditPhieuXuat';

import { phieuXuatQuery } from '../../../graphql/queries';
import { PhieuXuatByID } from '../../../types';

const EditPhieuXuatPage = () => {
    const { id } = useParams();
    const { data, loading, error } = useQuery<
        PhieuXuatByID, { id: string }
    >(phieuXuatQuery.BY_ID, {
        variables: {
            id: id || ''
        }
    });

    if (error || !id || (data && data.phieuXuat && data.phieuXuat.byID === null)) {
        return <NotFound />;
    }

    return (
        <LoadingWrapper loading={loading}>
            {data && <Box>
                <Center mb='md'>
                    <Title>Chỉnh sửa phiếu xuất</Title>
                </Center>
                <EditPhieuXuat
                    phieuXuat={data.phieuXuat.byID}
                />
                <Box>
                    {data.phieuXuat.byID.chiTiet.map(item => (
                        <Box key={item.id}>
                            <EditChiTietPhieuXuat
                                label={
                                    `${item.sanPham.tenSanPham} - 
                                    Số lượng xuất: ${item.soLuongXuat / 1000} kg`
                                }
                                idPhieuXuat={id}
                                idChiTiet={item.id}
                                initialValues={{
                                    tenSanPham: item.sanPham.tenSanPham,
                                    maSanPham: item.sanPham.id,
                                    soLuongTon: item.sanPham.soLuong,
                                    ...item,
                                }}
                            />
                            <Divider />
                        </Box>
                    ))}
                    <Box>
                        <CreateChiTietPhieuXuat
                            label='Thêm sản phẩm mới vào phiếu xuất'
                            idPhieuXuat={id}
                        />
                    </Box>
                </Box>
            </Box>}
        </LoadingWrapper>
    );
};

export default EditPhieuXuatPage;