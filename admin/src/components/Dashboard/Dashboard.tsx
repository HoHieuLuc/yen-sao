import { useDocumentTitle } from '@mantine/hooks';
import ThongTinNhapHang from './ThongTinNhapHang';
import ThongTinXuatHang from './ThongTinXuatHang';
import { Divider, Stack } from '@mantine/core';

interface Props {
    title: string;
}

const Dashboard = ({ title }: Props) => {
    useDocumentTitle(title);
    return (
        <Stack spacing='xs'>
            <ThongTinNhapHang />
            <Divider />
            <ThongTinXuatHang />
        </Stack>
    );
};

export default Dashboard;