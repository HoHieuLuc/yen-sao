import { useDocumentTitle } from '@mantine/hooks';
import { useTabs } from '../../../hooks';

import { Divider, Stack, Tabs } from '@mantine/core';
import PhoneNumber from './PhoneNumber/PhoneNumber';
import Address from './Address/Address';
import About from './About/About';

interface Props {
    title: string;
}

const PageInfo = ({ title }: Props) => {
    const { activeTab, onTabChange, currentTabTitle } = useTabs(
        ['gioi-thieu', 'lien-he'],
        ['Giới thiệu', 'Liên hệ']
    );
    useDocumentTitle(`${title} | ${currentTabTitle}`);

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
            <Tabs.Tab label='Giới thiệu' tabKey='gioi-thieu'>
                <About />
            </Tabs.Tab>
            <Tabs.Tab label='Thông tin liên hệ' tabKey='lien-he'>
                <Stack spacing='xs'>
                    <Address />
                    <Divider />
                    <PhoneNumber />
                </Stack>
            </Tabs.Tab>
        </Tabs>
    );
};

export default PageInfo;