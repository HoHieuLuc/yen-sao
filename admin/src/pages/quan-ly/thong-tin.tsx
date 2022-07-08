import { useDocumentTitle } from '@mantine/hooks';

import WebsiteInfo from '../../components/Manage/PageInfo/WebsiteInfo/WebsiteInfo';
import LoadingWrapper from '../../components/Utils/Wrappers/LoadingWrapper';
import About from '../../components/Manage/PageInfo/About/About';
import { Tabs } from '@mantine/core';

import { useTabs } from '../../hooks';
import { pageHooks } from '../../graphql/queries';

interface Props {
    title: string;
}

const ManageWebsiteInfoPage = ({ title }: Props) => {
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
                    <WebsiteInfo data={data.page} />
                </Tabs.Tab>
            </Tabs>}
        </LoadingWrapper>
    );
};

export default ManageWebsiteInfoPage;