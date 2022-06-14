import { useDocumentTitle } from '@mantine/hooks';
import { useParams } from 'react-router-dom';
import { useTabs } from '../../../hooks';

import ChiTietPhieuNhapList from './Tabs/ChiTietPhieuNhapList';
import ChiTietPhieuXuatList from './Tabs/ChiTietPhieuXuatList';
import ActivityTab from '../../Activity/Tab/ActivityTab';
import NotFound from '../../Utils/Errors/NotFound';
import DetailsTab from './Tabs/DetailsTab';
import { Tabs } from '@mantine/core';

import { sanPhamHooks } from '../../../graphql/queries';

const SanPhamDetailsPage = () => {
    const { id } = useParams();
    const { activeTab, onTabChange, currentTabTitle } = useTabs(
        ['chi-tiet', 'nhap-hang', 'xuat-hang', 'lich-su'],
        ['Chi tiết', 'Thông tin nhập hàng', 'Thông tin xuất hàng', 'Lịch sử chỉnh sửa']
    );
    const { data, loading, error } = sanPhamHooks.useSanPhamByID(id || '');

    useDocumentTitle(
        `${data && data.sanPham.byID
            ? data.sanPham.byID.tenSanPham
            : 'Đang tải...'} | ${currentTabTitle}`
    );

    if (!id || error || (data && !data.sanPham.byID)) {
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
            <Tabs.Tab label="Thông tin sản phẩm" tabKey='chi-tiet'>
                <DetailsTab
                    id={id}
                    data={data}
                    loading={loading}
                />
            </Tabs.Tab>
            <Tabs.Tab label="Thông tin nhập hàng" tabKey='nhap-hang'>
                <ChiTietPhieuNhapList id={id} />
            </Tabs.Tab>
            <Tabs.Tab label="Thông tin xuất hàng" tabKey='xuat-hang'>
                <ChiTietPhieuXuatList id={id} />
            </Tabs.Tab>
            <Tabs.Tab label="Lịch sử chỉnh sửa" tabKey='lich-su'>
                <ActivityTab id={id} />
            </Tabs.Tab>
        </Tabs>
    );
};

export default SanPhamDetailsPage;