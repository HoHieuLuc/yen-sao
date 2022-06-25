import { useMutation } from '@apollo/client';

import { Group, Text, Image, ActionIcon, Box, Stack, ScrollArea } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { CloseIcon } from '../Icons';

import { showErrorNotification } from '../../../events';
import { uploadQuery } from '../../../graphql/queries';

const dropzoneChildren = (maxLength: number) => {
    return (
        <Group position='center' spacing='xl' style={{ minHeight: 220, pointerEvents: 'none' }}>
            <div>
                <Text size='xl' inline>
                    Kéo ảnh vào hoặc click chuột để tải lên
                </Text>
                <Text size='sm' color='dimmed' inline mt={7}>
                    Chỉ được đăng tối đa {maxLength} ảnh
                </Text>
            </div>
        </Group>
    );
};

interface MultiUpload {
    multiUpload: Array<string>;
}

interface Props {
    images: Array<string>;
    onChange: (imageUrls: Array<string>) => void;
    onRemoveImage: (imageUrl: string) => void;
    maxLength: number;
}

const ImageDropzone = ({ images, onChange, onRemoveImage, maxLength }: Props) => {
    const [multiUpload, { loading }] = useMutation<
        { upload: MultiUpload }, { files: Array<File> }
    >(uploadQuery.MULTI_UPLOAD, {
        onError: (error) => showErrorNotification(error.message),
        onCompleted: (data) => {
            onChange(data.upload.multiUpload);
        }
    });

    const handleMultiUpload = (files: Array<File>) => {
        if (files.length + images.length > maxLength) {
            return showErrorNotification(`Chỉ được đăng tối đa ${maxLength} ảnh`);
        }
        void multiUpload({
            variables: {
                files
            }
        });
    };

    return (
        <Stack spacing='xs'>
            <Dropzone
                onDrop={(files) => handleMultiUpload(files)}
                onReject={() =>
                    showErrorNotification(
                        `File không hợp lệ.`
                    )
                }
                accept={IMAGE_MIME_TYPE}
                loading={loading}
            >
                {() => dropzoneChildren(maxLength)}
            </Dropzone>
            <ScrollArea
                sx={{
                    whiteSpace: 'nowrap',
                    position: 'relative',
                }}
            >
                <Box
                    sx={{
                        textAlign: 'center',
                    }}
                >
                    {images.map((imageUrl, index) => (
                        <Box
                            key={`${index}${imageUrl}`}
                            m={10}
                            sx={(theme) => ({
                                borderRadius: theme.radius.sm,
                                display: 'inline-block',
                                position: 'relative',
                                border: '1px solid #eaeaea',
                                [theme.fn.largerThan('sm')]: {
                                    width: '25%',
                                },
                                [theme.fn.smallerThan('sm')]: {
                                    width: '70%',
                                },
                            })}
                        >
                            <Image
                                src={imageUrl}
                                height={300}
                                alt='ảnh'
                                fit='contain'
                                withPlaceholder
                            />
                            <ActionIcon
                                color='red'
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                }}
                                onClick={() => onRemoveImage(imageUrl)}
                            >
                                <CloseIcon />
                            </ActionIcon>
                        </Box>
                    ))}
                </Box>
            </ScrollArea>
        </Stack>
    );
};

export default ImageDropzone;