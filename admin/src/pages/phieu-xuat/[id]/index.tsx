import { useDocumentTitle } from '@mantine/hooks';
import { useParams } from 'react-router-dom';
import { useTabs } from '../../../hooks';

import DetailsTab from '../../../components/PhieuXuat/Details/Tabs/DetailsTab';
import ActivityTab from '../../../components/Activity/Tab/ActivityTab';
import NotFound from '../../../components/Utils/Errors/NotFound';
import { Tabs } from '@mantine/core';

import { convertToShortDate } from '../../../utils/common';
import { phieuXuatHooks } from '../../../graphql/queries';

interface Props {
    title: string;
}

const PhieuXuatDetailsPage = ({ title }: Props) => {
    const { id } = useParams();
    const { activeTab, onTabChange, currentTabTitle } = useTabs(
        ['chi-tiet', 'lich-su'],
        ['Chi tiết', 'Lịch sử chỉnh sửa']
    );
    const { data, loading, error } = phieuXuatHooks.usePhieuXuatById(id || '');
    useDocumentTitle(
        `${data && data.phieuXuat.byID
            ? `Phiếu xuất ngày ${convertToShortDate(data.phieuXuat.byID.ngayXuat)}`
            : 'Đang tải...'} | ${currentTabTitle} - ${title}`
    );


    if (!id || error || (data && !data.phieuXuat.byID)) {
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
            <Tabs.Tab label='Thông tin phiếu xuất' tabKey='chi-tiet'>
                <DetailsTab
                    id={id}
                    data={data}
                    loading={loading}
                />
            </Tabs.Tab>
            <Tabs.Tab label='Lịch sử chỉnh sửa' tabKey='lich-su'>
                <ActivityTab id={id} />
            </Tabs.Tab>
        </Tabs>
    );
};

export default PhieuXuatDetailsPage;