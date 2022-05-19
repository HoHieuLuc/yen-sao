import { useDocumentTitle } from '@mantine/hooks';
import { useParams } from 'react-router-dom';

import LoadingWrapper from '../../Utils/Wrappers/LoadingWrapper';
import NotFound from '../../Utils/Errors/NotFound';
import ActivityDetails from './ActivityDetails';

import { activityHooks } from '../../../graphql/queries';

interface Props {
    title: string;
}

const ActivityDetailsPage = ({ title }: Props) => {
    useDocumentTitle(title);
    const { id } = useParams();
    const { data, loading, error } = activityHooks.useActivityById(id || '');

    if (error || (data && data.activityLog && data.activityLog.byID === null)) {
        return <NotFound />;
    }

    return (
        <LoadingWrapper loading={loading}>
            {data && <ActivityDetails data={data} />}
        </LoadingWrapper>
    );
};

export default ActivityDetailsPage;