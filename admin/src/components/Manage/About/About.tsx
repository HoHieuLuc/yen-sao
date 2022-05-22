import useGlobalStyles from '../../../utils/global.styles';
import { useDocumentTitle } from '@mantine/hooks';

import { Box, Button, Center, Group, Title } from '@mantine/core';
import LoadingWrapper from '../../Utils/Wrappers/LoadingWrapper';
import ErrorPage from '../../Utils/Errors/ErrorPage';
import RichTextEditor from '@mantine/rte';
import { Link } from 'react-router-dom';

import { pageHooks } from '../../../graphql/queries';
import { AboutData } from '../../../types';

interface Props {
    title: string;
}

const About = ({ title }: Props) => {
    useDocumentTitle(title);
    const { classes } = useGlobalStyles();
    const { data, loading, error } = pageHooks.usePageByName<AboutData>('about');

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
                        value={data.page.byName ? data.page.byName.content.value : ''}
                        readOnly
                        onChange={() => void (0)}
                        placeholder='Nhập nội dung bài viết giới thiệu'
                        className={classes.rte}
                    />
                    <Group position='right' mt='md'>
                        <Button
                            component={Link}
                            to='/quan-ly/about/sua'
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