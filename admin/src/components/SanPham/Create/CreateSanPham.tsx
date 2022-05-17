import SanPhamForm from '../Form/SanPhamForm';

import { sanPhamHooks } from '../../../graphql/queries';
import { SanPhamFormVars } from '../../../types';

const CreateSanPham = () => {
    const [createSanPham, { loading }] = sanPhamHooks.useCreateSanPham();

    const handleCreateSanPham = (values: SanPhamFormVars) => {
        void createSanPham({
            variables: {
                payload: values
            }
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