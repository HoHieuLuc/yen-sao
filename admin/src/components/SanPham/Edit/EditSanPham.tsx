import { useMutation, useQuery } from '@apollo/client';
import { Box } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { showErrorNotification, showSuccessNotification } from '../../../events';
import { sanPhamQuery } from '../../../graphql/queries';
import { SanPham } from '../../../types';
import NotFound from '../../Utils/Errors/NotFound';
import LoadingWrapper from '../../Utils/Wrappers/LoadingWrapper';
import SanPhamForm, { SanPhamFormVars } from '../Form/SanPhamForm';

interface SanPhamByID {
    sanPham: {
        byID: SanPham
    }
}

interface UpdateVars {
    id: string;
    payload: SanPhamFormVars;
}

const EditSanPham = () => {
    const { id } = useParams();
    const { data, loading, error } = useQuery<
        SanPhamByID, { id: string }
    >(sanPhamQuery.BY_ID, {
        variables: {
            id: id || ''
        }
    });

    const [updateSanPham, { loading: updateLoading }] = useMutation<
        never, UpdateVars
    >(sanPhamQuery.UPDATE, {
        onCompleted: () => showSuccessNotification('Cập nhật sản phẩm thành công'),
        onError: (error) => showErrorNotification(error.message)
    });

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
                    initialValues={{
                        ...data.sanPham.byID,
                        maLoaiSanPham: data.sanPham.byID.loaiSanPham.id
                    }}
                />}
            </Box>
        </></LoadingWrapper>
    );
};

export default EditSanPham;