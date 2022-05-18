import { useModals } from '@mantine/modals';

import MyAccordionItem from '../../Utils/AccordionItem/MyAccordionItem';
import DeleteChiTietPhieuXuat from '../Delete/DeleteChiTietPhieuXuat';
import ChiTietPhieuXuatForm from '../Form/ChiTietPhieuXuatForm';

import { chiTietPhieuXuatHooks } from '../../../graphql/queries';
import { ChiTietPhieuXuatInput } from '../../../types';

interface Props {
    label: string;
    idPhieuXuat: string;
    idChiTiet: string;
    initialValues: {
        tenSanPham: string;
        soLuongTon: number;
    } & ChiTietPhieuXuatInput;
}

const EditChiTietPhieuXuat = ({ idPhieuXuat, idChiTiet, initialValues, label }: Props) => {
    const [updateChiTietPhieuXuat, { loading }] = chiTietPhieuXuatHooks.useUpdateChiTietPhieuXuat();

    const modals = useModals();

    const handleUpdate = (values: ChiTietPhieuXuatInput) => {
        void updateChiTietPhieuXuat({
            variables: {
                idPhieuXuat: idPhieuXuat,
                idChiTiet,
                payload: values
            }
        });
    };

    const openDeleteModal = () => {
        const modalId = modals.openModal({
            title: <h3>Xóa chi tiết phiếu xuất</h3>,
            children: <DeleteChiTietPhieuXuat
                idPhieuXuat={idPhieuXuat}
                idChiTiet={idChiTiet}
                closeModal={() => modals.closeModal(modalId)}
                tenSanPham={initialValues.tenSanPham}
            />
        });
    };

    return (
        <MyAccordionItem label={label}>
            <ChiTietPhieuXuatForm
                type='update'
                initialValues={initialValues}
                loading={loading}
                onSubmit={handleUpdate}
                onDelete={openDeleteModal}
            />
        </MyAccordionItem>
    );
};

export default EditChiTietPhieuXuat;