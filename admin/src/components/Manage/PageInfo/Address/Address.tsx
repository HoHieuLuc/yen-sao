import LoadingWrapper from '../../../Utils/Wrappers/LoadingWrapper';
import ErrorPage from '../../../Utils/Errors/ErrorPage';
import EditAddress from './EditAddress';

import { pageHooks } from '../../../../graphql/queries';
import { AddressData } from '../../../../types';

const Address = () => {
    const { data, loading, error } = pageHooks.usePageByName<AddressData>('address');

    if (error) {
        return <ErrorPage />;
    }

    return (
        <LoadingWrapper loading={loading}>
            {data && (
                <EditAddress 
                    data={data}
                />
            )}
        </LoadingWrapper>
    );
};

export default Address;