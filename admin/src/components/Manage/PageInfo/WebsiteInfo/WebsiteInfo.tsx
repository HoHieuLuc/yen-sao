import EditWebsiteInfo from './EditWebsiteInfo';
import { Stack } from '@mantine/core';

import { WebsiteInfoData } from '../../../../types';

interface Props {
    data: WebsiteInfoData;
}

const WebsiteInfo = ({ data }: Props) => {
    return (
        <Stack spacing='xs'>
            <EditWebsiteInfo data={data} />
        </Stack>
    );
};

export default WebsiteInfo;