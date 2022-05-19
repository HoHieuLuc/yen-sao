import { useParams } from 'react-router-dom';

import LoadingWrapper from '../../../Utils/Wrappers/LoadingWrapper';
import ErrorPage from '../../../Utils/Errors/ErrorPage';
import ActivityDetails from './ActivityDetails';

import { activityHooks } from '../../../../graphql/queries';
import { useDocumentTitle } from '@mantine/hooks';

interface Props {
    title: string;
}

const ActivityDetailsPage = ({ title }: Props) => {
    useDocumentTitle(title);
    const { id } = useParams();
    const { data, loading, error } = activityHooks.useActivityById(id || '');

    if (error) {
        return <ErrorPage />;
    }

    return (
        <LoadingWrapper loading={loading}>
            {data && <ActivityDetails data={data} />}
        </LoadingWrapper>
    );
};

export default ActivityDetailsPage;