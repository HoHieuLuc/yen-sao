import { uploadQuery } from '../graphql/queries/upload';
import { showErrorNotification } from '../events';
import { useMutation } from '@apollo/client';

interface SingleUpload {
    singleUpload: string;
}

export const useUpload = () => {
    const [_singleUpload] = useMutation<{ upload: SingleUpload }>(uploadQuery.SINGLE_UPLOAD);

    const singleUpload = async (file: File) => {
        const { data, errors } = await _singleUpload({
            variables: {
                file
            },
            onError: (error) => showErrorNotification(`
                Đăng ảnh thất bại. Lỗi: ${error.message}
            `)
        });

        if (!data || errors) {
            return '';
        }
        return data.upload.singleUpload;
    };

    return {
        singleUpload,
    };
};