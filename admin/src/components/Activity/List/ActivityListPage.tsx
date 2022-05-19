import { usePagination } from '../../../hooks';
import { useDocumentTitle } from '@mantine/hooks';
import { useModals } from '@mantine/modals';

import LoadingWrapper from '../../Utils/Wrappers/LoadingWrapper';
import MyPagination from '../../Utils/Pagination/MyPagination';
import { Button, Center, Stack, Title } from '@mantine/core';
import ErrorPage from '../../Utils/Errors/ErrorPage';
import DeleteActivity from '../Delete/DeleteActivity';
import ActivityList from './ActivityList';

import { activityHooks } from '../../../graphql/queries';

interface Props {
    title: string;
}

const ActivityListPage = ({ title }: Props) => {
    useDocumentTitle(title);
    const { currentPage, handlePageChange, limit, handleLimitChange } = usePagination();
    const { data, loading, error } = activityHooks.useAllActivities({
        page: currentPage,
        limit
    });

    const modals = useModals();

    const openDeleteModal = () => {
        const modalId = modals.openModal({
            title: <h3>Xóa lịch sử hoạt động</h3>,
            children: <DeleteActivity
                closeModal={() => modals.closeModal(modalId)}
            />
        });
    };

    if (error) {
        return <ErrorPage />;
    }

    return (
        <LoadingWrapper loading={loading}>
            <Stack spacing='xs'>
                <Center>
                    <Title>Danh sách hoạt động</Title>
                </Center>
                <Button
                    color='red'
                    variant='subtle'
                    onClick={openDeleteModal}
                >
                    Xóa lịch sử hoạt động
                </Button>
                {data && <ActivityList
                    data={data.activityLog.all.docs}
                    currentPage={currentPage}
                    limit={limit}
                />}
                {data && (
                    <MyPagination
                        total={data.activityLog.all.pageInfo.totalPages}
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

export default ActivityListPage;