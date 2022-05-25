import EditPhoneNumber from './EditPhoneNumber';

import { PhoneNumberData } from '../../../../types';

interface Props {
    data: PhoneNumberData;
}

const PhoneNumber = ({ data }: Props) => {
    return (
        <>
            {data && (
                <EditPhoneNumber
                    data={data}
                />
            )}
        </>
    );
};

export default PhoneNumber;