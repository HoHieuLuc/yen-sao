import EditAddress from './EditAddress';

import { AddressData } from '../../../../types';

interface Props {
    data: AddressData;
}

const Address = ({ data }: Props) => {
    return (
        <>
            {data && (
                <EditAddress
                    data={data}
                />
            )}
        </>
    );
};

export default Address;