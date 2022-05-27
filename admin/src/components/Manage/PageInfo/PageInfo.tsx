import { useDocumentTitle } from '@mantine/hooks';
import { useTabs } from '../../../hooks';

import LoadingWrapper from '../../Utils/Wrappers/LoadingWrapper';
import { Divider, Stack, Tabs } from '@mantine/core';
import PhoneNumber from './PhoneNumber/PhoneNumber';
import FacebookLink from './Facebook/FacebookLink';
import Address from './Address/Address';
import About from './About/About';

import { pageHooks } from '../../../graphql/queries';

interface Props {
    title: string;
}

const PageInfo = ({ title }: Props) => {
    const { activeTab, onTabChange, currentTabTitle } = useTabs(
        ['gioi-thieu', 'thong-tin-website'],
        ['Giới thiệu', 'Thông tin Website']
    );
    useDocumentTitle(`${title} | ${currentTabTitle}`);
    const { data, loading } = pageHooks.useAllPages();

    return (
        <LoadingWrapper loading={loading}>
            {data && <Tabs
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
                    <About data={data.page} />
                </Tabs.Tab>
                <Tabs.Tab label='Thông tin Website' tabKey='thong-tin-website'>
                    <Stack spacing='xs'>
                        <Address data={data.page} />
                        <Divider />
                        <PhoneNumber data={data.page} />
                        <Divider />
                        <FacebookLink data={data.page} />
                    </Stack>
                </Tabs.Tab>
            </Tabs>}
        </LoadingWrapper>
    );
};

export default PageInfo;