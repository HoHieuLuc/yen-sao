import { useDocumentTitle } from '@mantine/hooks';
import { useTabs } from '../../hooks';

import { Divider, Stack, Tabs } from '@mantine/core';
import AccountActivity from './Tab/AccountActivity';
import ChangePassword from './Tab/ChangePassword';
import AccountDetails from './Tab/AccountDetails';

import { authHooks } from '../../graphql/queries';
import EditAccount from './Tab/EditAccount';

interface Props {
    title: string;
}

const Account = ({ title }: Props) => {
    const { activeTab, onTabChange, currentTabTitle } = useTabs(
        ['thong-tin', 'cap-nhat', 'lich-su-hoat-dong'],
        ['Thông tin', 'Cập nhật tài khoản', 'Lịch sử hoạt động']
    );
    useDocumentTitle(`${title} | ${currentTabTitle}`);
    const me = authHooks.useReadCurrentUser();
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
            <Tabs.Tab label='Thông tin tài khoản' tabKey='thong-tin'>
                <AccountDetails user={me} />
            </Tabs.Tab>
            <Tabs.Tab label='Cập nhật tài khoản' tabKey='cap-nhat'>
                <Stack spacing='xs'>
                    <EditAccount user={me} />
                    <Divider />
                    <ChangePassword />
                </Stack>
            </Tabs.Tab>
            <Tabs.Tab label='Lịch sử hoạt động' tabKey='lich-su-hoat-dong'>
                <AccountActivity />
            </Tabs.Tab>
        </Tabs>
    );
};

export default Account;