import { Stack } from '@mantine/core';
import { WebsiteInfoData } from '../../../../types';
import EditWebsiteInfo from './EditWebsiteInfo';

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