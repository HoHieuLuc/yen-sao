import { useDocumentTitle } from '@mantine/hooks';
import { useParams } from 'react-router-dom';
import { useTabs } from '../../../../hooks';

import ErrorPage from '../../../Utils/Errors/ErrorPage';
import ActivityTab from './ActivityTab';
import DetailsTab from './DetailsTab';
import { Tabs } from '@mantine/core';

import { userHooks } from '../../../../graphql/queries';

const UserDetails = () => {
    const { id } = useParams();
    const userByIdResult = userHooks.useUserById(id || '');
    const { activeTab, onTabChange, currentTabTitle } = useTabs(
        ['thong-tin', 'hoat-dong'],
        ['Thông tin', 'Lịch sử hoạt động']
    );
    useDocumentTitle(
        `${userByIdResult.data && userByIdResult.data.user.byID
            ? userByIdResult.data.user.byID.username
            : 'Đang tải...'} | ${currentTabTitle}`
    );

    if (!id || userByIdResult.error) {
        return <ErrorPage />;
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
                    id={id}
                    {...userByIdResult}
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

export default UserDetails;