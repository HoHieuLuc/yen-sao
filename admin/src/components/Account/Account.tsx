import { useDocumentTitle } from '@mantine/hooks';
import { useTabs } from '../../hooks';

import ChangePassword from './ChangePassword';
import AccountDetails from './AccountDetails';
import { Tabs } from '@mantine/core';

import { authHooks } from '../../graphql/queries';

interface Props {
    title: string;
}

const Account = ({ title }: Props) => {
    const { activeTab, onTabChange, currentTabTitle } = useTabs(
        ['thong-tin', 'doi-mat-khau'],
        ['Thông tin', 'Đổi mật khẩu']
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
            <Tabs.Tab label='Đổi mật khẩu' tabKey='doi-mat-khau'>
                <ChangePassword />
            </Tabs.Tab>
        </Tabs>
    );
};

export default Account;