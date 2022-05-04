import { useMutation } from '@apollo/client';
import { useModals } from '@mantine/modals';

import DeleteChiTietPhieuNhap from '../Delete/DeleteChiTietPhieuNhap';
import ChiTietPhieuNhapForm from '../Form/ChiTietPhieuNhapForm';

import { showErrorNotification, showSuccessNotification } from '../../../events';
import { chiTietPhieuNhapQuery } from '../../../graphql/queries';
import { ChiTietPhieuNhapFormData } from '../../../types';

interface Props {
    idPhieuNhap: string;
    idChiTiet: string;
    initialValues: {
        maSanPham: string;
        tenSanPham: string;
        soLuongTon: number;
        soLuongNhap: number;
        donGiaNhap: number;
    }
}

interface UpdateVars extends Omit<Props, 'initialValues'> {
    payload: ChiTietPhieuNhapFormData;
}

const EditChiTietPhieuNhap = ({ idPhieuNhap, idChiTiet, initialValues }: Props) => {
    const [updateChiTietPhieuNhap, { loading }] = useMutation<
        never, UpdateVars
    >(chiTietPhieuNhapQuery.UPDATE, {
        onError: (error) => showErrorNotification(error.message),
        onCompleted: () => showSuccessNotification('Cập nhật thành công'),
    });

    const modals = useModals();

    const handleUpdate = (values: ChiTietPhieuNhapFormData) => {
        void updateChiTietPhieuNhap({
            variables: {
                idPhieuNhap,
                idChiTiet,
                payload: values,
            }
        });
    };

    const openDeleteModal = () => {
        const modalId = modals.openModal({
            title: <h3>Xóa chi tiết phiếu nhập</h3>,
            children: <DeleteChiTietPhieuNhap
                idPhieuNhap={idPhieuNhap}
                idChiTiet={idChiTiet}
                closeModal={() => modals.closeModal(modalId)}
                tenSanPham={initialValues.tenSanPham}
            />
        });
    };

    return (
        <ChiTietPhieuNhapForm
            type='update'
            initialValues={initialValues}
            loading={loading}
            onSubmit={handleUpdate}
            onDelete={openDeleteModal}
        />
    );
};

export default EditChiTietPhieuNhap;