import { useDocumentTitle } from '@mantine/hooks';
import { useParams } from 'react-router-dom';

import ActivityDetails from '../../components/Activity/Details/ActivityDetails';
import LoadingWrapper from '../../components/Utils/Wrappers/LoadingWrapper';
import NotFound from '../../components/Utils/Errors/NotFound';

import { activityHooks } from '../../graphql/queries';

interface Props {
    title: string;
}

const ActivityDetailsPage = ({ title }: Props) => {
    const { id } = useParams();
    const { data, loading, error } = activityHooks.useActivityById(id || '');
    useDocumentTitle(
        `Hoạt động: ${data && data.activityLog.byID
            ? data.activityLog.byID.description.name
            : 'Đang tải...'} - ${title}`
    );
    if (error || (data && !data.activityLog.byID)) {
        return <NotFound />;
    }

    return (
        <LoadingWrapper loading={loading}>
            {data && data.activityLog.byID && <ActivityDetails data={data.activityLog.byID} />}
        </LoadingWrapper>
    );
};

export default ActivityDetailsPage;