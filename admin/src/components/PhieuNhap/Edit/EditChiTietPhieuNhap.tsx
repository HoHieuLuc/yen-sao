import { useModals } from '@mantine/modals';

import MyAccordionItem from '../../Utils/AccordionItem/MyAccordionItem';
import DeleteChiTietPhieuNhap from '../Delete/DeleteChiTietPhieuNhap';
import ChiTietPhieuNhapForm from '../Form/ChiTietPhieuNhapForm';

import { chiTietPhieuNhapHooks } from '../../../graphql/queries';
import { ChiTietPhieuNhapInput } from '../../../types';

interface Props {
    label: string;
    idPhieuNhap: string;
    idChiTiet: string;
    initialValues: {
        tenSanPham: string;
        soLuongTon: number;
    } & ChiTietPhieuNhapInput;
}

const EditChiTietPhieuNhap = ({ label, idPhieuNhap, idChiTiet, initialValues }: Props) => {
    const [updateChiTietPhieuNhap, { loading }] = chiTietPhieuNhapHooks.useUpdateChiTietPhieuNhap();

    const modals = useModals();

    const handleUpdate = (values: ChiTietPhieuNhapInput) => {
        void updateChiTietPhieuNhap({
            variables: {
                idPhieuNhap,
                idChiTiet,
                payload: values
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
        <MyAccordionItem label={label}>
            <ChiTietPhieuNhapForm
                type='update'
                initialValues={initialValues}
                loading={loading}
                onSubmit={handleUpdate}
                onDelete={openDeleteModal}
            />
        </MyAccordionItem>
    );
};

export default EditChiTietPhieuNhap;