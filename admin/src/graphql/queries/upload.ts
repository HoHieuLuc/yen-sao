import { gql } from '@apollo/client';

export const SINGLE_UPLOAD = gql`
    mutation SingleUpload($file: Upload!) {
        upload {
            singleUpload(file: $file)
        }
    }
`;