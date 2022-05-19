import { Anchor, Box, Paper, SimpleGrid, Text } from '@mantine/core';
import { Link } from 'react-router-dom';

import { convertToVND } from '../../../utils/common';
import { ChiTietPhieuNhap } from '../../../types';

interface Props {
    chiTietPhieuNhap: ChiTietPhieuNhap;
    index: number;
}

const ChiTietPhieuNhapItem = ({ chiTietPhieuNhap, index }: Props) => {    
    return (
        <Paper shadow='sm' p='md' withBorder mb='xs'>
            <Box>
                <Anchor
                    component={Link}
                    to={`/san-pham/${chiTietPhieuNhap.sanPham.id}`}
                >
                    <Text>
                        {index + 1}. {chiTietPhieuNhap.sanPham.tenSanPham}
                    </Text>
                </Anchor>
            </Box>
            <SimpleGrid cols={3}>
                <Text>
                    Số lượng nhập: {chiTietPhieuNhap.soLuongNhap / 1000} kg
                </Text>
                <Text>
                    Đơn giá nhập: {convertToVND(chiTietPhieuNhap.donGiaNhap)}
                </Text>
                <Text>
                    Thành tiền: {convertToVND(
                        chiTietPhieuNhap.thanhTien ||
                            chiTietPhieuNhap.soLuongNhap / 100 * chiTietPhieuNhap.donGiaNhap
                    )}
                </Text>
            </SimpleGrid>
            {chiTietPhieuNhap.ghiChu && (
                <>Ghi chú:
                    <Text style={{ whiteSpace: 'pre-wrap' }}>
                        {chiTietPhieuNhap.ghiChu}
                    </Text>
                </>
            )}
        </Paper>
    );
};

export default ChiTietPhieuNhapItem;