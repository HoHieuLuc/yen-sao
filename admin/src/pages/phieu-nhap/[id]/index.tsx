import { useDocumentTitle } from '@mantine/hooks';
import { useParams } from 'react-router-dom';
import { useTabs } from '../../../hooks';

import DetailsTab from '../../../components/PhieuNhap/Details/Tabs/DetailsTab';
import ActivityTab from '../../../components/Activity/Tab/ActivityTab';
import NotFound from '../../../components/Utils/Errors/NotFound';
import { Tabs } from '@mantine/core';

import { convertToShortDate } from '../../../utils/common';
import { phieuNhapHooks } from '../../../graphql/queries';

interface Props {
    title: string;
}

const PhieuNhapDetailsPage = ({ title }: Props) => {
    const { id } = useParams();
    const { activeTab, onTabChange, currentTabTitle } = useTabs(
        ['chi-tiet', 'lich-su'],
        ['Chi tiết', 'Lịch sử chỉnh sửa']
    );

    const { data, loading, error } = phieuNhapHooks.usePhieuNhapByID(id || '');
    useDocumentTitle(
        `${data && data.phieuNhap.byID
            ? `Phiếu nhập ngày ${convertToShortDate(data.phieuNhap.byID.ngayNhap)}`
            : 'Đang tải...'} | ${currentTabTitle} - ${title}`
    );


    if (!id || error || (data && !data.phieuNhap.byID)) {
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
            <Tabs.Tab label='Thông tin phiếu nhập' tabKey='chi-tiet'>
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

export default PhieuNhapDetailsPage;