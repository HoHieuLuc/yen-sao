import { Anchor, Box, Paper, SimpleGrid, Text } from '@mantine/core';
import { Link } from 'react-router-dom';

import { convertToVND } from '../../../utils/common';
import { ChiTietPhieuXuat } from '../../../types';

interface Props {
    chiTietPhieuXuat: ChiTietPhieuXuat;
    index: number;
}

const ChiTietPhieuXuatItem = ({ chiTietPhieuXuat, index }: Props) => {
    return (
        <Paper shadow='sm' p='md' withBorder mb='xs'>
            <Box>
                <Anchor
                    component={Link}
                    to={`/san-pham/${chiTietPhieuXuat.sanPham.id}`}
                >
                    <Text>
                        {index + 1}. {chiTietPhieuXuat.sanPham.tenSanPham}
                    </Text>
                </Anchor>
            </Box>
            <SimpleGrid cols={3}>
                <Text>
                    Số lượng xuất: {chiTietPhieuXuat.soLuongXuat / 1000} kg
                </Text>
                <Text>
                    Đơn giá xuất: {convertToVND(chiTietPhieuXuat.donGiaXuat)}
                </Text>
                <Text>
                    Thành tiền: {convertToVND(
                        chiTietPhieuXuat.thanhTien ||
                        chiTietPhieuXuat.soLuongXuat / 100 * chiTietPhieuXuat.donGiaXuat
                    )}
                </Text>
            </SimpleGrid>
            {chiTietPhieuXuat.ghiChu && (
                <>Ghi chú:
                    <Text style={{ whiteSpace: 'pre-wrap' }}>
                        {chiTietPhieuXuat.ghiChu}
                    </Text>
                </>
            )}
        </Paper>
    );
};

export default ChiTietPhieuXuatItem;