import { useDocumentTitle } from '@mantine/hooks';
import { usePagination } from '../../hooks';
import { useModals } from '@mantine/modals';

import DeleteActivity from '../../components/Activity/Delete/DeleteActivity';
import AppPagination from '../../components/Utils/Pagination/AppPagination';
import LoadingWrapper from '../../components/Utils/Wrappers/LoadingWrapper';
import ActivityList from '../../components/Activity/List/ActivityList';
import ErrorPage from '../../components/Utils/Errors/ErrorPage';
import { Button, Center, Stack, Title } from '@mantine/core';

import { activityHooks } from '../../graphql/queries';

interface Props {
    title: string;
}

const ManageActivitiesPage = ({ title }: Props) => {
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
                    <AppPagination
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

export default ManageActivitiesPage;