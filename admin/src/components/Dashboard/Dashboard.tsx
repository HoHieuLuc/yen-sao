import { Divider, Stack } from '@mantine/core';
import ThongTinNhapHang from './ThongTinNhapHang';
import ThongTinXuatHang from './ThongTinXuatHang';

const Dashboard = () => {
    return (
        <Stack spacing='xs'>
            <ThongTinNhapHang />
            <Divider />
            <ThongTinXuatHang />
        </Stack>
    );
};

export default Dashboard;