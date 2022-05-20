import { usePagination } from '../../../hooks';

import LoadingWrapper from '../../Utils/Wrappers/LoadingWrapper';
import MyPagination from '../../Utils/Pagination/MyPagination';
import ErrorPage from '../../Utils/Errors/ErrorPage';
import ActivityList from '../List/ActivityList';

import { activityHooks } from '../../../graphql/queries';

interface Props {
    id: string;
}
// for activities by document id
const ActivityTab = ({ id }: Props) => {
    const { currentPage, handlePageChange, limit, handleLimitChange } = usePagination();
    const { data, loading, error } = activityHooks.useActivitiesByDocumentId({
        page: currentPage,
        limit,
        documentId: id
    });

    if (error) {
        return <ErrorPage />;
    }

    return (
        <LoadingWrapper loading={loading}>
            {data && <>
                <ActivityList
                    data={data.activityLog.byDocumentID.docs}
                    currentPage={currentPage}
                    limit={limit}
                />
                <MyPagination
                    total={data.activityLog.byDocumentID.pageInfo.totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    limit={limit.toString()}
                    onLimitChange={handleLimitChange}
                />
            </>}
        </LoadingWrapper>
    );
};

export default ActivityTab;