import { useMutation } from '@apollo/client';
import { showErrorNotification, showSuccessNotification } from '../../../events';
import { chiTietPhieuXuatQuery } from '../../../graphql/queries';
import { ChiTietPhieuXuatFormData } from '../../../types';
import AccordionItem from '../../Utils/AccordionItem/MyAccordionItem';
import ChiTietPhieuXuatForm from '../Form/ChiTietPhieuXuatForm';

interface Props {
    label: string;
    idPhieuXuat: string;
}

interface CreateVars extends Omit<Props, 'label'> {
    payload: ChiTietPhieuXuatFormData
}

const CreateChiTietPhieuXuat = ({ idPhieuXuat, label }: Props) => {
    const [createChiTietPhieuXuat, { loading }] = useMutation<
        never, CreateVars
    >(chiTietPhieuXuatQuery.CREATE, {
        onError: (error) => showErrorNotification(error.message),
        onCompleted: () => showSuccessNotification('Thêm sản phẩm vào phiếu xuất thành công')
    });

    const handleCreate = (values: ChiTietPhieuXuatFormData, callback: () => void) => {
        void createChiTietPhieuXuat({
            variables: {
                idPhieuXuat,
                payload: values
            },
            onCompleted: callback
        });
    };

    return (
        <AccordionItem label={label}>
            <ChiTietPhieuXuatForm
                type='create'
                loading={loading}
                onSubmit={handleCreate}
            />
        </AccordionItem>
    );
};

export default CreateChiTietPhieuXuat;