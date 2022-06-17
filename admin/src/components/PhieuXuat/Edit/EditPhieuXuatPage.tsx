import { useDocumentTitle } from '@mantine/hooks';
import { useParams } from 'react-router-dom';

import CreateChiTietPhieuXuat from '../Create/CreateChiTietPhieuXuat';
import LoadingWrapper from '../../Utils/Wrappers/LoadingWrapper';
import { Box, Center, Divider, Title } from '@mantine/core';
import EditChiTietPhieuXuat from './EditChiTietPhieuXuat';
import NotFound from '../../Utils/Errors/NotFound';
import EditPhieuXuat from './EditPhieuXuat';

import { convertToShortDate } from '../../../utils/common';
import { phieuXuatHooks } from '../../../graphql/queries';

interface Props {
    title: string;
}

const EditPhieuXuatPage = ({ title }: Props) => {
    const { id } = useParams();
    const { data, loading, error } = phieuXuatHooks.usePhieuXuatById(id || '');
    useDocumentTitle(
        `${data && data.phieuXuat.byID
            ? `Phiếu xuất ngày ${convertToShortDate(data.phieuXuat.byID.ngayXuat)}`
            : 'Đang tải...'} | Chỉnh sửa - ${title}`
    );

    if (error || !id || (data && !data.phieuXuat.byID)) {
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