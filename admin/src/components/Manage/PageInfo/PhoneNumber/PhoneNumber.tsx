import LoadingWrapper from '../../../Utils/Wrappers/LoadingWrapper';
import ErrorPage from '../../../Utils/Errors/ErrorPage';
import EditPhoneNumber from './EditPhoneNumber';

import { pageHooks } from '../../../../graphql/queries';
import { PhoneNumberData } from '../../../../types';

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