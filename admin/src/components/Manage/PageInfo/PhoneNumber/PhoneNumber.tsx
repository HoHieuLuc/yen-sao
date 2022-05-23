import { pageHooks } from '../../../../graphql/queries';
import { PhoneNumberData } from '../../../../types';
import ErrorPage from '../../../Utils/Errors/ErrorPage';
import LoadingWrapper from '../../../Utils/Wrappers/LoadingWrapper';
import EditPhoneNumber from './EditPhoneNumber';

const PhoneNumber = () => {
    const { data, loading, error } = pageHooks.usePageByName<PhoneNumberData>('phone');

    if (error) {
        return <ErrorPage />;
    }

    return (
        <LoadingWrapper loading={loading}>
            {data && (
                <EditPhoneNumber 
                    data={data}
                />
            )}
        </LoadingWrapper>
    );
};

export default PhoneNumber;