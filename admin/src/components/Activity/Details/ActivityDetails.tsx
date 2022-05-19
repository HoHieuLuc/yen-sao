import PhieuNhapDetails from '../../PhieuNhap/Details/PhieuNhapDetails';
import PhieuXuatDetails from '../../PhieuXuat/Details/PhieuXuatDetails';
import SanPhamDetails from '../../SanPham/Details/SanPhamDetails';
import { Box, Center, Paper, Title } from '@mantine/core';
import ErrorPage from '../../Utils/Errors/ErrorPage';

import { ActivityById } from '../../../types';

interface Props {
    data: ActivityById
}

const ActivityDetails = ({ data }: Props) => {
    let content: React.ReactNode = null;

    switch (data.activityLog.byID.onCollection) {
        case 'SanPham':
            content = <SanPhamDetails data={data.activityLog.byID.description.value} />;
            break;
        case 'PhieuNhap':
            content = <PhieuNhapDetails data={data.activityLog.byID.description.value} />;
            break;
        case 'PhieuXuat' :
            content = <PhieuXuatDetails data={data.activityLog.byID.description.value} />;
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
                        Người thực hiện: {data.activityLog.byID.user.fullname}
                    </div>
                    <div>
                        Mô tả: {data.activityLog.byID.description.name}
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