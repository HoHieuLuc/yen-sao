import { useDocumentTitle } from '@mantine/hooks';
import { useParams } from 'react-router-dom';
import { useTabs } from '../../../hooks';

import ActivityTab from '../../Activity/Tab/ActivityTab';
import NotFound from '../../Utils/Errors/NotFound';
import DetailsTab from './Tabs/DetailsTab';
import { Tabs } from '@mantine/core';

import { camNangHooks } from '../../../graphql/queries';

const CamNangDetailsPage = () => {
    const { id } = useParams();
    const { data, loading, error } = camNangHooks.useCamNangByID(id || '');
    const { activeTab, onTabChange, currentTabTitle } = useTabs(
        ['chi-tiet', 'lich-su'],
        ['Chi tiết', 'Lịch sử chỉnh sửa']
    );

    useDocumentTitle(
        `${data && data.camNang.byID 
            ? `Cẩm nang ${data.camNang.byID.tieuDe}`
            : 'Đang tải...'} | ${currentTabTitle}`
    );

    if (!id || error || (data && !data.camNang.byID)) {
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
            <Tabs.Tab label='Thông tin cẩm nang' tabKey='chi-tiet'>
                <DetailsTab
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

export default CamNangDetailsPage;