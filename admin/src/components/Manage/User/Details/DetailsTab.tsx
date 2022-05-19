import LoadingWrapper from '../../../Utils/Wrappers/LoadingWrapper';
import AccountDetails from '../../../Account/AccountDetails';

import { UserById } from '../../../../types';

interface Props {
    id: string;
    data: UserById | undefined;
    loading: boolean;
}

const DetailsTab = ({ data, loading }: Props) => {

    return (
        <LoadingWrapper loading={loading}>
            {data && (
                <AccountDetails 
                    user={data.user.byID}
                />
            )}
        </LoadingWrapper>
    );
};

export default DetailsTab;