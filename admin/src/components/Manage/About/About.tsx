import { useQuery } from '@apollo/client';
import useGlobalStyles from '../../../utils/global.styles';

import { Box, Button, Center, Group, Title } from '@mantine/core';
import LoadingWrapper from '../../Utils/Wrappers/LoadingWrapper';
import ErrorPage from '../../Utils/Errors/ErrorPage';
import RichTextEditor from '@mantine/rte';
import { Link } from 'react-router-dom';

import { configQuery } from '../../../graphql/queries';

export interface AboutData {
    config: {
        byName: {
            id: string;
            name: string;
            content: {
                value: string;
            }
        } | null
    }
}

const About = () => {
    const { classes } = useGlobalStyles();
    const { data, loading, error } = useQuery<
        AboutData, { name: 'about' }
    >(configQuery.CONFIG_BY_NAME,
        {
            variables: {
                name: 'about'
            }
        }
    );

    if (error) {
        return <ErrorPage />;
    }

    return (
        <LoadingWrapper loading={loading}>
            <Center mb='sm'>
                <Title>Bài viết giới thiệu</Title>
            </Center>
            {data &&
                <Box>
                    <RichTextEditor
                        value={data.config.byName ? data.config.byName.content.value : ''}
                        readOnly
                        onChange={() => void (0)}
                        placeholder='Nhập nội dung bài viết giới thiệu'
                        className={classes.rte}
                    />
                    <Group position='right' mt='md'>
                        <Button
                            component={Link}
                            to='/manage/about/sua'
                            color='teal'
                        >
                            Chỉnh sửa
                        </Button>
                    </Group>
                </Box>
            }
        </LoadingWrapper>
    );
};

export default About;