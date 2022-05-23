import useGlobalStyles from '../../../../utils/global.styles';
import { useState } from 'react';

import { Box, Button, Center, Group, Title } from '@mantine/core';
import LoadingWrapper from '../../../Utils/Wrappers/LoadingWrapper';
import ErrorPage from '../../../Utils/Errors/ErrorPage';
import RichTextEditor from '@mantine/rte';
import EditAbout from './EditAbout';

import { pageHooks } from '../../../../graphql/queries';
import { AboutData } from '../../../../types';

const About = () => {
    const { classes } = useGlobalStyles();
    const { data, loading, error } = pageHooks.usePageByName<AboutData>('about');
    const [editMode, setEditMode] = useState(false);

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
                    {editMode
                        ? <EditAbout
                            data={data}
                            setEditMode={setEditMode}
                        />
                        : <>
                            <RichTextEditor
                                value={data.page.byName ? data.page.byName.content.value : ''}
                                readOnly
                                onChange={() => void (0)}
                                placeholder='Nhập nội dung bài viết giới thiệu'
                                className={classes.rte}
                            />
                            <Group position='right' mt='md'>
                                <Button
                                    onClick={() => setEditMode(true)}
                                    color='teal'
                                >
                                    Chỉnh sửa
                                </Button>
                            </Group>
                        </>}
                </Box>
            }
        </LoadingWrapper>
    );
};

export default About;