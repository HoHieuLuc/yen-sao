import { useDocumentTitle } from '@mantine/hooks';

import ThongTinNhapHang from '../components/Dashboard/ThongTinNhapHang';
import ThongTinXuatHang from '../components/Dashboard/ThongTinXuatHang';
import { Divider, Stack } from '@mantine/core';

interface Props {
    title: string;
}

const HomePage = ({ title }: Props) => {
    useDocumentTitle(title);
    return (
        <Stack spacing='xs'>
            <ThongTinNhapHang />
            <Divider />
            <ThongTinXuatHang />
        </Stack>
    );
};

export default HomePage;