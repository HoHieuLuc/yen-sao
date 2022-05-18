import { useDocumentTitle } from '@mantine/hooks';
import { useParams } from 'react-router-dom';

import LoadingWrapper from '../../Utils/Wrappers/LoadingWrapper';
import NotFound from '../../Utils/Errors/NotFound';
import SanPhamForm from '../Form/SanPhamForm';
import { Box } from '@mantine/core';

import { sanPhamHooks } from '../../../graphql/queries';
import { SanPhamFormVars } from '../../../types';

const EditSanPham = () => {
    const { id } = useParams();
    const { data, loading, error } = sanPhamHooks.useSanPhamByID(id || '');

    useDocumentTitle(
        `${data && data.sanPham.byID
            ? `${data.sanPham.byID.tenSanPham}`
            : 'Đang tải...'} | Chỉnh sửa`
    );

    const [updateSanPham, { loading: updateLoading }] = sanPhamHooks.useUpdateSanPham();

    if (error || !id || (data && data.sanPham && data.sanPham.byID === null)) {
        return <NotFound />;
    }

    const handleUpdate = (values: SanPhamFormVars) => {
        void updateSanPham({
            variables: {
                id,
                payload: values
            }
        });
    };

    return (
        <LoadingWrapper loading={loading}><>
            <Box>
                {data && <SanPhamForm
                    loading={updateLoading}
                    handleSubmit={handleUpdate}
                    initialValues={data.sanPham.byID}
                />}
            </Box>
        </></LoadingWrapper>
    );
};

export default EditSanPham;