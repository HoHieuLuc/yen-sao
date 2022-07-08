import { useDocumentTitle } from '@mantine/hooks';
import { useParams } from 'react-router-dom';
import { useTabs } from '../../../hooks';

import ActivityTab from '../../../components/Manage/User/Details/ActivityTab';
import DetailsTab from '../../../components/Manage/User/Details/DetailsTab';
import NotFound from '../../../components/Utils/Errors/NotFound';
import { Tabs } from '@mantine/core';

import { userHooks } from '../../../graphql/queries';

interface Props {
    title: string;
}

const ManageUserDetailsPage = ({ title }: Props) => {
    const { id } = useParams();
    const { data, loading, error } = userHooks.useUserById(id || '');
    const { activeTab, onTabChange, currentTabTitle } = useTabs(
        ['thong-tin', 'hoat-dong'],
        ['Thông tin', 'Lịch sử hoạt động']
    );
    useDocumentTitle(
        `Người dùng: ${data && data.user.byID
            ? data.user.byID.fullname
            : 'Đang tải...'} | ${currentTabTitle} - ${title}`
    );

    if (!id || error || (data && !data.user.byID)) {
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
            <Tabs.Tab label="Thông tin người dùng" tabKey='thong-tin'>
                <DetailsTab
                    data={data}
                    loading={loading}
                />
            </Tabs.Tab>
            <Tabs.Tab label="Lịch sử hoạt động" tabKey='hoat-dong'>
                <ActivityTab
                    id={id}
                />
            </Tabs.Tab>
        </Tabs>
    );
};

export default ManageUserDetailsPage;