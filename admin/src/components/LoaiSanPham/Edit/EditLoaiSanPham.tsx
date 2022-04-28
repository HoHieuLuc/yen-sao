import { useMutation } from '@apollo/client';

import { showNotification } from '@mantine/notifications';
import { UPDATE_LOAI_SAN_PHAM } from '../../../graphql/queries';
import { LoaiSanPham } from '../../../types';
import LoaiSanPhamForm from '../Form/LoaiSanPhamForm';

interface Props extends LoaiSanPham {
    closeModal: () => void;
}

interface LoaiSanPhamVars {
    id: string;
    payload: Omit<LoaiSanPham, 'id'>
}

const EditLoaiSanPham = ({ id, tenLoaiSanPham, moTa, closeModal }: Props) => {
    const [updateLoaiSanPham, { loading }] = useMutation<
        never, LoaiSanPhamVars
    >(UPDATE_LOAI_SAN_PHAM, {
        onCompleted: () => {
            showNotification({
                title: 'Thông báo',
                message: 'Cập nhật loại sản phẩm thành công',
            });
            closeModal();
        },
        onError: (error) => {
            showNotification({
                title: 'Thông báo',
                message: error.message,
                color: 'red',
            });
        }
    });

    const handleSubmit = (values: LoaiSanPham, _: () => void) => {
        void updateLoaiSanPham({
            variables: {
                id: id,
                payload: {
                    tenLoaiSanPham: values.tenLoaiSanPham,
                    moTa: values.moTa
                },
            }
        });
    };

    return (
        <LoaiSanPhamForm
            handleSubmit={handleSubmit}
            id={id}
            loading={loading}
            tenLoaiSanPham={tenLoaiSanPham}
            moTa={moTa}
        />
    );
};

export default EditLoaiSanPham;