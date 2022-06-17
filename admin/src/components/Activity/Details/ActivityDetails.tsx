import PhieuNhapDetails from '../../PhieuNhap/Details/PhieuNhapDetails';
import PhieuXuatDetails from '../../PhieuXuat/Details/PhieuXuatDetails';
import SanPhamDetails from '../../SanPham/Details/SanPhamDetails';
import CamNangDetails from '../../CamNang/Details/CamNangDetails';
import { Box, Center, Paper, Title } from '@mantine/core';
import ErrorPage from '../../Utils/Errors/ErrorPage';

import { convertToVietnameseDate } from '../../../utils/common';
import { ActivityKind } from '../../../types';

interface Props {
    data: ActivityKind
}

const ActivityDetails = ({ data }: Props) => {
    let content: React.ReactNode = null;

    switch (data.onCollection) {
        case 'SanPham':
            content = <SanPhamDetails data={data.description.value} />;
            break;
        case 'PhieuNhap':
            content = <PhieuNhapDetails data={data.description.value} />;
            break;
        case 'PhieuXuat' :
            content = <PhieuXuatDetails data={data.description.value} />;
            break;
        case 'CamNang':
            content = <CamNangDetails data={data.description.value} />;
            break;
        default:
            break;
    }

    if (!content) {
        return <ErrorPage />;
    }

    return (
        <Box>
            <Center>
                <Title>Chi tiết lịch sử hoạt động</Title>
            </Center>
            <Center>
                <Box>
                    <div>
                        Người thực hiện: {data.user.fullname}
                    </div>
                    <div>
                        Mô tả: {data.description.name}
                    </div>
                    <div>
                        Ngày thực hiện: {convertToVietnameseDate(data.createdAt)}
                    </div>
                </Box>
            </Center>
            <Paper
                shadow='md'
                withBorder
                style={{ padding: 10 }}
            >
                {content}
            </Paper>
        </Box>
    );
};

export default ActivityDetails;