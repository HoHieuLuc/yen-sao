import { useDocumentTitle } from '@mantine/hooks';
import { useTabs } from '../../hooks';

import ChangePassword from './ChangePassword';
import AccountDetails from './AccountDetails';
import { Divider, Stack, Tabs } from '@mantine/core';

import { authHooks } from '../../graphql/queries';
import EditAccount from './EditAccount';

interface Props {
    title: string;
}

const Account = ({ title }: Props) => {
    const { activeTab, onTabChange, currentTabTitle } = useTabs(
        ['thong-tin', 'cap-nhat'],
        ['Thông tin', 'Cập nhật tài khoản']
    );
    useDocumentTitle(`${title} | ${currentTabTitle}`);
    const me = authHooks.useReadCurrentUser();
    return (
        <Tabs
            active={activeTab}
            onTabChange={onTabChange}
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
        </Tabs>
    );
};

export default Account;