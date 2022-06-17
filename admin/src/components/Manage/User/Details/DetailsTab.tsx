import LoadingWrapper from '../../../Utils/Wrappers/LoadingWrapper';
import AccountDetails from '../../../Account/Tab/AccountDetails';

import { UserById } from '../../../../types';

interface Props {
    data: UserById | undefined;
    loading: boolean;
}

const DetailsTab = ({ data, loading }: Props) => {
    return (
        <LoadingWrapper loading={loading}>
            {data && data.user.byID && (
                <AccountDetails 
                    user={data.user.byID}
                />
            )}
        </LoadingWrapper>
    );
};

export default DetailsTab;