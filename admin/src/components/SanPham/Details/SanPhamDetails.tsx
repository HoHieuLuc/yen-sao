import { useDocumentTitle } from '@mantine/hooks';
import { useParams } from 'react-router-dom';
import { useTabs } from '../../../hooks';

import ChiTietPhieuNhapList from './ChiTietPhieuNhapList';
import ChiTietPhieuXuatList from './ChiTietPhieuXuatList';
import NotFound from '../../Utils/Errors/NotFound';
import DetailsTab from './DetailsTab';
import { Tabs } from '@mantine/core';

import { sanPhamHooks } from '../../../graphql/queries';

const SanPhamDetails = () => {
    const { id } = useParams();
    const { activeTab, onTabChange, currentTabTitle } = useTabs(
        ['thong-tin', 'nhap-hang', 'xuat-hang'],
        ['Chi tiết', 'Thông tin nhập hàng', 'Thông tin xuất hàng']
    );
    const sanPhamByIdResult = sanPhamHooks.useSanPhamByID(id || '');

    useDocumentTitle(
        `${sanPhamByIdResult.data && sanPhamByIdResult.data.sanPham.byID
            ? sanPhamByIdResult.data.sanPham.byID.tenSanPham
            : 'Đang tải...'} | ${currentTabTitle}`
    );

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
                <DetailsTab
                    id={id}
                    {...sanPhamByIdResult}
                />
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