import { useApolloClient, useMutation } from '@apollo/client';

import LoaiSanPhamForm from '../Form/LoaiSanPhamForm';

import { showErrorNotification, showSuccessNotification } from '../../../events';
import { loaiSanPhamQuery } from '../../../graphql/queries';
import { LoaiSanPham } from '../../../types';

type LoaiSanPhamVars = Omit<LoaiSanPham, 'id'>;

const CreateLoaiSanPham = () => {
    const client = useApolloClient();
    const [createLoaiSanPham, { loading }] = useMutation<
        never, { payload: LoaiSanPhamVars }
    >(loaiSanPhamQuery.CREATE, {
        onCompleted: () => {
            showSuccessNotification('Thêm loại sản phẩm thành công');
            client.cache.evict({
                id: 'ROOT_QUERY',
                fieldName: 'loaiSanPham',
            });
            client.cache.gc();
        },
        onError: (error) => showErrorNotification(error.message)
    });

    const handleSubmit = (values: LoaiSanPhamVars, callback: () => void) => {
        void createLoaiSanPham({
            variables: {
                payload: {
                    tenLoaiSanPham: values.tenLoaiSanPham,
                    moTa: values.moTa
                }
            },
            onCompleted: callback
        });
    };

    return (
        <LoaiSanPhamForm
            handleSubmit={handleSubmit}
            loading={loading}
            id=''
            tenLoaiSanPham=''
            moTa=''
        />
    );
};

export default CreateLoaiSanPham;