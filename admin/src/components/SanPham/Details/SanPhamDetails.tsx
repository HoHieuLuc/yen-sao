import { useParams } from 'react-router-dom';
import { useTabs } from '../../../hooks';

import ChiTietPhieuNhapList from './ChiTietPhieuNhapList';
import ChiTietPhieuXuatList from './ChiTietPhieuXuatList';
import NotFound from '../../Utils/Errors/NotFound';
import DetailsTab from './DetailsTab';
import { Tabs } from '@mantine/core';

const SanPhamDetails = () => {
    const { id } = useParams();
    const { activeTab, onTabChange } = useTabs([
        'thong-tin', 'nhap-hang', 'xuat-hang'
    ]);

    if (!id) {
        return <NotFound />;
    }

    return (
        <Tabs
            active={activeTab}
            onTabChange={onTabChange}
            styles={{
                root: {
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%'
                },
                body: {
                    flexGrow: 1
                }
            }}
        >
            <Tabs.Tab label="Thông tin sản phẩm" tabKey='thong-tin'>
                <DetailsTab id={id} />
            </Tabs.Tab>
            <Tabs.Tab label="Thông tin nhập hàng" tabKey='nhap-hang'>
                <ChiTietPhieuNhapList id={id} />
            </Tabs.Tab>
            <Tabs.Tab label="Thông tin xuất hàng" tabKey='xuat-hang'>
                <ChiTietPhieuXuatList id={id} />
            </Tabs.Tab>
        </Tabs>
    );
};

export default SanPhamDetails;