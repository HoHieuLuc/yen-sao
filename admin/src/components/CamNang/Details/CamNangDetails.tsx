import useGlobalStyles from '../../../utils/global.styles';

import { Center, Title, Text, Stack, Box, Image } from '@mantine/core';
import RichTextEditor from '@mantine/rte';

import { convertToVietnameseDate } from '../../../utils/common';
import { CamNang } from '../../../types';

interface Props {
    data: CamNang;
}

const CamNangDetails = ({ data }: Props) => {
    const { classes } = useGlobalStyles();

    return (
        <Stack spacing='xs'>
            <Box>
                <Center>
                    <Image
                        src={data.anhDaiDien}
                        withPlaceholder
                        alt='Ảnh đại diện của cẩm nang'
                        fit='contain'
                    />
                </Center>
                <Center>
                    <Title>{data.tieuDe}</Title>
                </Center>
                <Center>
                    <Text color='dimmed'>
                        ({data.isPublic ? 'Công khai' : 'Không công khai'})
                    </Text>
                </Center>
            </Box>
            <Text>Ngày đăng: {convertToVietnameseDate(data.createdAt)}</Text>
            <RichTextEditor
                readOnly
                value={data.noiDung}
                onChange={() => void (0)}
                className={classes.rte}
            />
        </Stack>
    );
};

export default CamNangDetails;