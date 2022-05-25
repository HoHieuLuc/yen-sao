import EditFacebookLink from './EditFacebookLink';

import { FacebookLink } from '../../../../types';

interface Props {
    data: FacebookLink;
}

const Address = ({ data }: Props) => {

    return (
        <>
            {data && (
                <EditFacebookLink
                    data={data}
                />
            )}
        </>
    );
};

export default Address;