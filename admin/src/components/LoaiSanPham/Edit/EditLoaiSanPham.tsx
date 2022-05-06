import { useMutation } from '@apollo/client';

import LoaiSanPhamForm from '../Form/LoaiSanPhamForm';

import { showErrorNotification, showSuccessNotification } from '../../../events';
import { loaiSanPhamQuery } from '../../../graphql/queries';
import { LoaiSanPham } from '../../../types';

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
    >(loaiSanPhamQuery.UPDATE, {
        onCompleted: () => {
            showSuccessNotification('Cập nhật loại sản phẩm thành công');
            closeModal();
        },
        onError: (error) => {
            showErrorNotification(error.message);
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