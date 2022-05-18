import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useTabs = (tabKeys: Array<string>, tabTitles?: Array<string>) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [activeTab, setActiveTab] = useState(
        tabKeys.indexOf(searchParams.get('tab') || tabKeys[0])
    );

    useEffect(() => {
        if (activeTab === -1) {
            setActiveTab(0);
            searchParams.delete('tab');
            setSearchParams(searchParams);
        }
    }, []);

    const onTabChange = (active: number, tabKey: string) => {
        setActiveTab(active);
        setSearchParams({
            tab: tabKey
        });
    };

    return {
        activeTab,
        onTabChange,
        currentTabTitle: tabTitles ? tabTitles[activeTab] : ''
    };
};