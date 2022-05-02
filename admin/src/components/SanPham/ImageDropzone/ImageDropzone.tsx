import { Group, Text, Image, ActionIcon } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useMutation } from '@apollo/client';
import { MULTI_UPLOAD } from '../../../graphql/queries';
import { showNotification } from '@mantine/notifications';
import appConfig from '../../../config';
import CloseIcon from '../../Utils/Icons/CloseIcon';

export const dropzoneChildren = () => {
    return (
        <Group position="center" spacing="xl" style={{ minHeight: 220, pointerEvents: 'none' }}>
            <div>
                <Text size="xl" inline>
                    Kéo ảnh vào hoặc click chuột để tải lên
                </Text>
                <Text size="sm" color="dimmed" inline mt={7}>
                    Chỉ được đăng tối đa 3 ảnh, mỗi ảnh tối đa 3mb
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
}

const ImageDropzone = ({ images, onChange, onRemoveImage }: Props) => {
    const [multiUpload, { loading }] = useMutation<
        { upload: MultiUpload }, { files: Array<File> }
    >(MULTI_UPLOAD, {
        onError: (error) => {
            console.log(error);
            showNotification({
                title: 'Thông báo',
                message: error.message,
                color: 'red'
            });
        },
        onCompleted: (data) => {
            const imageUrls = data.upload.multiUpload.map((url) => `${appConfig.apiURL}${url}`);
            onChange(imageUrls);
        }
    });

    const showError = (message: string) => showNotification({
        title: 'Thông báo',
        message,
        color: 'red'
    });

    const handleMultiUpload = (files: Array<File>) => {
        if (files.length + images.length > 3) {
            return showError('Bạn chỉ được upload tối đa 3 ảnh.');
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
                onReject={() => showError(`File không hợp lệ hoặc kích thước file quá lớn (tối đa 3mb).`)}
                maxSize={3 * 1024 ** 2}
                accept={IMAGE_MIME_TYPE}
                loading={loading}
            >
                {() => dropzoneChildren()}
            </Dropzone>
            <Group position="center" spacing="sm" mt='sm'>
                {images.map((imageUrl, index) => (
                    <div
                        key={index}
                        style={{
                            maxWidth: '25%',
                            position: 'relative'
                        }}
                    >
                        <Image
                            src={imageUrl}
                            height={300}
                            alt="ảnh"
                            fit='contain'
                            withPlaceholder
                        />
                        <ActionIcon
                            color='red'
                            style={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            }}
                            onClick={() => onRemoveImage(imageUrl)}
                        >
                            <CloseIcon />
                        </ActionIcon>
                    </div>
                ))}
            </Group>
        </>
    );
};

export default ImageDropzone;