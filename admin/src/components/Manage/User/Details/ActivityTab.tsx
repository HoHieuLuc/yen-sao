import { usePagination } from '../../../../hooks';

import LoadingWrapper from '../../../Utils/Wrappers/LoadingWrapper';
import MyPagination from '../../../Utils/Pagination/MyPagination';
import ActivityList from '../../Activity/List/ActivityList';
import ErrorPage from '../../../Utils/Errors/ErrorPage';
import { Center, Stack, Title } from '@mantine/core';

import { activityHooks } from '../../../../graphql/queries';

interface Props {
    id: string;
}

const ActivityTab = ({ id }: Props) => {
    const { currentPage, handlePageChange, limit, handleLimitChange } = usePagination();
    const { data, loading, error } = activityHooks.useActivitesByUserId({
        page: currentPage,
        limit,
        userId: id
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
                {data && (<>
                    <ActivityList
                        data={data.activityLog.byUserID.docs}
                        currentPage={currentPage}
                        limit={limit}
                    />
                    <MyPagination
                        total={data.activityLog.byUserID.pageInfo.totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        limit={limit.toString()}
                        onLimitChange={handleLimitChange}
                    />
                </>)}
            </Stack>
        </LoadingWrapper>
    );
};

export default ActivityTab;