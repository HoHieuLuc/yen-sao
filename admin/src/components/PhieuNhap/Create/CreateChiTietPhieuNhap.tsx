import { useMutation } from '@apollo/client';
import { showErrorNotification, showSuccessNotification } from '../../../events';
import { chiTietPhieuNhapQuery } from '../../../graphql/queries';
import { ChiTietPhieuNhapFormData } from '../../../types';
import AccordionItem from '../../Utils/AccordionItem/MyAccordionItem';
import ChiTietPhieuNhapForm from '../Form/ChiTietPhieuNhapForm';

interface Props {
    label: string;
    idPhieuNhap: string;
}

interface CreateVars extends Omit<Props, 'label'> {
    payload: ChiTietPhieuNhapFormData
}

const CreateChiTietPhieuNhap = ({ label, idPhieuNhap }: Props) => {
    const [createChiTietPhieuNhap, { loading }] = useMutation<
        never, CreateVars
    >(chiTietPhieuNhapQuery.CREATE, {
        onError: (error) => showErrorNotification(error.message),
        onCompleted: () => showSuccessNotification('Thêm sản phẩm vào phiếu nhập thành công')
    });

    const handleCreate = (values: ChiTietPhieuNhapFormData, callback: () => void) => {
        void createChiTietPhieuNhap({
            variables: {
                idPhieuNhap,
                payload: values
            },
            onCompleted: callback
        });
    };

    return (
        <AccordionItem label={label}>
            <ChiTietPhieuNhapForm
                type='create'
                loading={loading}
                onSubmit={handleCreate}
            />
        </AccordionItem>
    );
};

export default CreateChiTietPhieuNhap;