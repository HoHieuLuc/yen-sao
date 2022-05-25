import useGlobalStyles from '../../../../utils/global.styles';
import { useState } from 'react';

import { Box, Button, Center, Group, Title } from '@mantine/core';
import RichTextEditor from '@mantine/rte';
import EditAbout from './EditAbout';

import { AboutData } from '../../../../types';

interface Props {
    data: AboutData;
}

const About = ({ data }: Props) => {
    const { classes } = useGlobalStyles();
    const [editMode, setEditMode] = useState(false);

    return (
        <Box>
            <Center mb='sm'>
                <Title>Bài viết giới thiệu</Title>
            </Center>
            <Box>
                {editMode
                    ? <EditAbout
                        data={data}
                        setEditMode={setEditMode}
                    />
                    : <>
                        <RichTextEditor
                            value={data.about ? data.about.content.value : ''}
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
        </Box>
    );
};

export default About;