import EditFacebookLink from './EditFacebookLink';

import { FacebookLinkData } from '../../../../types';

interface Props {
    data: FacebookLinkData;
}

const FacebookLink = ({ data }: Props) => {
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

export default FacebookLink;