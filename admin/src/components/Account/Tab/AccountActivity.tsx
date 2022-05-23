import { usePagination } from '../../../hooks';

import AppPagination from '../../Utils/Pagination/AppPagination';
import LoadingWrapper from '../../Utils/Wrappers/LoadingWrapper';
import ActivityList from '../../Activity/List/ActivityList';
import { Center, Stack, Title } from '@mantine/core';
import ErrorPage from '../../Utils/Errors/ErrorPage';

import { activityHooks } from '../../../graphql/queries';

const AccountActivity = () => {
    const { currentPage, handlePageChange, limit, handleLimitChange } = usePagination();
    const { data, loading, error } = activityHooks.useMyActivities({
        page: currentPage,
        limit
    });

    if (error) {
        return <ErrorPage />;
    }

    return (
        <LoadingWrapper loading={loading}>
            <Stack spacing='xs'>
                <Center>
                    <Title>Lịch sử hoạt động</Title>
                </Center> 
                {data && <ActivityList
                    data={data.activityLog.my.docs}
                    currentPage={currentPage}
                    limit={limit}
                />}
                {data && (
                    <AppPagination
                        total={data.activityLog.my.pageInfo.totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        limit={limit.toString()}
                        onLimitChange={handleLimitChange}
                    />
                )}
            </Stack>
        </LoadingWrapper>
    );
};

export default AccountActivity;