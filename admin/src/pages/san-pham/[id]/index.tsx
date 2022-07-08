import { useDocumentTitle } from '@mantine/hooks';
import { useParams } from 'react-router-dom';
import { useTabs } from '../../../hooks';

import ChiTietPhieuXuatList from '../../../components/SanPham/Details/Tabs/ChiTietPhieuXuatList';
import ChiTietPhieuNhapList from '../../../components/SanPham/Details/Tabs/ChiTietPhieuNhapList';
import DetailsTab from '../../../components/SanPham/Details/Tabs/DetailsTab';
import ActivityTab from '../../../components/Activity/Tab/ActivityTab';
import NotFound from '../../../components/Utils/Errors/NotFound';
import { Tabs } from '@mantine/core';

import { sanPhamHooks } from '../../../graphql/queries';

interface Props {
    title: string;
}

const SanPhamDetailsPage = ({ title }: Props) => {
    const { id } = useParams();
    const { activeTab, onTabChange, currentTabTitle } = useTabs(
        ['chi-tiet', 'nhap-hang', 'xuat-hang', 'lich-su'],
        ['Chi tiết', 'Thông tin nhập hàng', 'Thông tin xuất hàng', 'Lịch sử chỉnh sửa']
    );
    const { data, loading, error } = sanPhamHooks.useSanPhamByID(id || '');

    useDocumentTitle(
        `${data && data.sanPham.byID
            ? data.sanPham.byID.tenSanPham
            : 'Đang tải...'} | ${currentTabTitle} - ${title}`
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