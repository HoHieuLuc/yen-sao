import { gql } from '@apollo/client';

export const SINGLE_UPLOAD = gql`
    mutation SingleUpload($file: Upload!) {
        upload {
            singleUpload(file: $file)
        }
    }
`;

export const MULTI_UPLOAD = gql`
    mutation MultiUpload($files: [Upload!]!) {
        upload {
            multiUpload(files: $files)
        }
    }
`;