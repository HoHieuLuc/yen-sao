import { Tabs } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { useTabs } from '../../../hooks';
import NotFound from '../../Utils/Errors/NotFound';
import ChiTietPhieuNhapList from './ChiTietPhieuNhapList';
import ChiTietPhieuXuatList from './ChiTietPhieuXuatList';
import DetailsTab from './DetailsTab';

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
                <DetailsTab id={id} isOpened={activeTab === 0} />
            </Tabs.Tab>
            <Tabs.Tab label="Thông tin nhập hàng" tabKey='nhap-hang'>
                <ChiTietPhieuNhapList id={id} isOpened={activeTab === 1} />
            </Tabs.Tab>
            <Tabs.Tab label="Thông tin xuất hàng" tabKey='xuat-hang'>
                <ChiTietPhieuXuatList id={id} isOpened={activeTab === 2} />
            </Tabs.Tab>
        </Tabs>
    );
};

export default SanPhamDetails;