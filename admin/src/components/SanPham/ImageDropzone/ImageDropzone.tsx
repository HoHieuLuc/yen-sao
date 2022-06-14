import { useMutation } from '@apollo/client';

import { Group, Text, Image, ActionIcon, Box } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { CloseIcon } from '../../Utils/Icons';

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
        <>
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
            <Group position='center' spacing='sm' mt='sm'>
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
        </>
    );
};

export default ImageDropzone;