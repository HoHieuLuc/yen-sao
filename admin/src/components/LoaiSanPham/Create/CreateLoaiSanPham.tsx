import { useApolloClient, useMutation } from '@apollo/client';
import { showNotification } from '@mantine/notifications';
import { CREATE_LOAI_SAN_PHAM } from '../../../graphql/queries';
import { LoaiSanPham } from '../../../types';
import LoaiSanPhamForm from '../Form/LoaiSanPhamForm';

type LoaiSanPhamVars = Omit<LoaiSanPham, 'id'>;

const CreateLoaiSanPham = () => {
    const client = useApolloClient();
    const [createLoaiSanPham, { loading }] = useMutation<
        never, { payload: LoaiSanPhamVars }
    >(CREATE_LOAI_SAN_PHAM, {
        onCompleted: () => {
            showNotification({
                title: 'Thông báo',
                message: 'Tạo loại sản phẩm thành công',
            });
            client.cache.evict({
                id: 'ROOT_QUERY',
                fieldName: 'loaiSanPham',
            });
        },
        onError: (error) => showNotification({
            title: 'Thông báo',
            message: error.message,
            color: 'red'
        })
    });

    const handleSubmit = (values: LoaiSanPhamVars, callback: () => void) => {
        createLoaiSanPham({
            variables: {
                payload: {
                    tenLoaiSanPham: values.tenLoaiSanPham,
                    moTa: values.moTa
                }
            }
        }).then(() => callback()).catch(void (0));
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