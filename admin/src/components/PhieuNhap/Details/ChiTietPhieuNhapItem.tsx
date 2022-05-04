import { Anchor, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import { ChiTietPhieuNhap } from '../../../types';
import { convertToVND } from '../../../utils/common';

interface Props {
    chiTietPhieuNhap: ChiTietPhieuNhap;
    index: number;
}

const ChiTietPhieuNhapItem = ({ chiTietPhieuNhap, index }: Props) => {
    return (
        <tr>
            <td>{index + 1}</td>
            <td>
                <Anchor
                    component={Link}
                    to={`/san-pham/${chiTietPhieuNhap.sanPham.id}`}
                >
                    <Text lineClamp={1}>
                        {chiTietPhieuNhap.sanPham.tenSanPham}
                    </Text>
                </Anchor>
            </td>
            <td>{chiTietPhieuNhap.soLuongNhap}</td>
            <td>{convertToVND(chiTietPhieuNhap.donGiaNhap)}</td>
            <td>
                {convertToVND(
                    chiTietPhieuNhap.donGiaNhap * chiTietPhieuNhap.soLuongNhap
                )}
            </td>
        </tr>
    );
};

export default ChiTietPhieuNhapItem;