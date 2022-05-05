import { Anchor, Text } from '@mantine/core';
import { Link } from 'react-router-dom';

import { convertToVND } from '../../../utils/common';
import { ChiTietPhieuXuat } from '../../../types';

interface Props {
    chiTietPhieuXuat: ChiTietPhieuXuat;
    index: number;
}

const ChiTietPhieuXuatItem = ({ chiTietPhieuXuat, index }: Props) => {
    return (
        <tr>
            <td>{index + 1}</td>
            <td>
                <Anchor
                    component={Link}
                    to={`/san-pham/${chiTietPhieuXuat.sanPham.id}`}
                >
                    <Text lineClamp={1}>
                        {chiTietPhieuXuat.sanPham.tenSanPham}
                    </Text>
                </Anchor>
            </td>
            <td>{chiTietPhieuXuat.soLuongXuat}</td>
            <td>{convertToVND(chiTietPhieuXuat.donGiaXuat)}</td>
            <td>
                {convertToVND(
                    chiTietPhieuXuat.donGiaXuat * chiTietPhieuXuat.soLuongXuat
                )}
            </td>
        </tr>
    );
};

export default ChiTietPhieuXuatItem;