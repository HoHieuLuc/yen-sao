import { useMutation } from '@apollo/client';

import MyAccordionItem from '../../Utils/AccordionItem/MyAccordionItem';
import ChiTietPhieuNhapForm from '../Form/ChiTietPhieuNhapForm';

import { showErrorNotification, showSuccessNotification } from '../../../events';
import { chiTietPhieuNhapQuery } from '../../../graphql/queries';
import { ChiTietPhieuNhapInput } from '../../../types';

interface Props {
    label: string;
    idPhieuNhap: string;
}

interface CreateVars extends Omit<Props, 'label'> {
    payload: ChiTietPhieuNhapInput
}

const CreateChiTietPhieuNhap = ({ label, idPhieuNhap }: Props) => {
    const [createChiTietPhieuNhap, { loading }] = useMutation<
        never, CreateVars
    >(chiTietPhieuNhapQuery.CREATE, {
        onError: (error) => showErrorNotification(error.message),
        onCompleted: () => showSuccessNotification('Thêm sản phẩm vào phiếu nhập thành công')
    });

    const handleCreate = (values: ChiTietPhieuNhapInput, callback: () => void) => {
        void createChiTietPhieuNhap({
            variables: {
                idPhieuNhap,
                payload: values
            },
            onCompleted: callback
        });
    };

    return (
        <MyAccordionItem label={label}>
            <ChiTietPhieuNhapForm
                type='create'
                loading={loading}
                onSubmit={handleCreate}
            />
        </MyAccordionItem>
    );
};

export default CreateChiTietPhieuNhap;