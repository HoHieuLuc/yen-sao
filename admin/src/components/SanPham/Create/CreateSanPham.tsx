import { useApolloClient, useMutation } from '@apollo/client';
import { showErrorNotification, showSuccessNotification } from '../../../events';
import { sanPhamQuery } from '../../../graphql/queries';
import SanPhamForm, { SanPhamFormVars } from '../Form/SanPhamForm';

const CreateSanPham = () => {
    const client = useApolloClient();
    const [createSanPham, { loading }] = useMutation<
        never, { payload: SanPhamFormVars }
    >(sanPhamQuery.CREATE, {
        onCompleted: () => {
            showSuccessNotification('Thêm sản phẩm thành công');
            client.cache.evict({
                id: 'ROOT_QUERY',
                fieldName: 'sanPham',
            });
        },
        onError: (error) => showErrorNotification(error.message)
    });

    const handleCreateSanPham = (values: SanPhamFormVars, callback: () => void) => {
        void createSanPham({
            variables: {
                payload: values
            },
            onCompleted: callback
        });
    };

    return (
        <SanPhamForm
            loading={loading}
            handleSubmit={handleCreateSanPham}
        />
    );
};

export default CreateSanPham;