import { useMutation } from '@apollo/client';
import { useState } from 'react';

import { Group, Text, Image, ActionIcon, Box, TextInput, Stack, Button } from '@mantine/core';
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
    const [imageAsUrl, setImageAsUrl] = useState('');

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

    const handleSubmitImageUrl = () => {
        if (imageAsUrl.length === 0) {
            return showErrorNotification('Vui lòng nhập đường dẫn ảnh');
        }
        if (images.length + 1 > maxLength) {
            return showErrorNotification(`Chỉ được đăng tối đa ${maxLength} ảnh`);
        }

        if (imageAsUrl.match(/\.(jpeg|jpg|gif|png)$/) !== null) {
            onChange([imageAsUrl]);
            setImageAsUrl('');
        } else {
            showErrorNotification('Đường dẫn ảnh không hợp lệ');
        }
    };

    return (
        <Stack spacing='xs'>
            <TextInput
                label='Đường dẫn ảnh'
                placeholder='Nhập đường dẫn ảnh'
                value={imageAsUrl}
                onChange={(e) => setImageAsUrl(e.target.value)}
                rightSection={
                    <Button
                        onClick={handleSubmitImageUrl}
                    >
                        Xác nhận
                    </Button>
                }
            />
            Hoặc
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
            <Group position='center' spacing='sm'>
                {images.map((imageUrl, index) => (
                    <Box
                        key={`${index}${imageUrl}`}
                        sx={(theme) => ({
                            borderRadius: theme.radius.sm,
                            maxWidth: '25%',
                            position: 'relative',
                            border: '1px solid #eaeaea',
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
            </Group>
        </Stack>
    );
};

export default ImageDropzone;