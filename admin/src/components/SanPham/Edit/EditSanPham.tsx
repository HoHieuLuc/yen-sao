import { useDocumentTitle } from '@mantine/hooks';
import { useParams } from 'react-router-dom';

import LoadingWrapper from '../../Utils/Wrappers/LoadingWrapper';
import NotFound from '../../Utils/Errors/NotFound';
import SanPhamForm from '../Form/SanPhamForm';

import { sanPhamHooks } from '../../../graphql/queries';
import { SanPhamFormData } from '../../../types';

const EditSanPham = () => {
    const { id } = useParams();
    const { data, loading, error } = sanPhamHooks.useSanPhamByID(id || '');

    useDocumentTitle(
        `${data && data.sanPham.byID
            ? `${data.sanPham.byID.tenSanPham}`
            : 'Đang tải...'} | Chỉnh sửa`
    );

    const [updateSanPham, { loading: updateLoading }] = sanPhamHooks.useUpdateSanPham();

    if (error || !id || (data && !data.sanPham.byID)) {
        return <NotFound />;
    }

    const handleUpdate = (values: SanPhamFormData) => {
        void updateSanPham({
            variables: {
                id,
                payload: values
            }
        });
    };

    return (
        <LoadingWrapper loading={loading}>
            {data && <SanPhamForm
                loading={updateLoading}
                handleSubmit={handleUpdate}
                initialValues={data.sanPham.byID}
            />}
        </LoadingWrapper>
    );
};

export default EditSanPham;