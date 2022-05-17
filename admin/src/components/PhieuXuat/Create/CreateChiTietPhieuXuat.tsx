import { useMutation } from '@apollo/client';

import MyAccordionItem from '../../Utils/AccordionItem/MyAccordionItem';
import ChiTietPhieuXuatForm from '../Form/ChiTietPhieuXuatForm';

import { showErrorNotification, showSuccessNotification } from '../../../events';
import { chiTietPhieuXuatQuery } from '../../../graphql/queries';
import { ChiTietPhieuXuatInput } from '../../../types';

interface Props {
    label: string;
    idPhieuXuat: string;
}

interface CreateVars extends Omit<Props, 'label'> {
    payload: ChiTietPhieuXuatInput
}

const CreateChiTietPhieuXuat = ({ idPhieuXuat, label }: Props) => {
    const [createChiTietPhieuXuat, { loading }] = useMutation<
        never, CreateVars
    >(chiTietPhieuXuatQuery.CREATE, {
        onError: (error) => showErrorNotification(error.message),
        onCompleted: () => showSuccessNotification('Thêm sản phẩm vào phiếu xuất thành công')
    });

    const handleCreate = (values: ChiTietPhieuXuatInput, callback: () => void) => {
        void createChiTietPhieuXuat({
            variables: {
                idPhieuXuat,
                payload: values
            },
            onCompleted: callback
        });
    };

    return (
        <MyAccordionItem label={label}>
            <ChiTietPhieuXuatForm
                type='create'
                loading={loading}
                onSubmit={handleCreate}
            />
        </MyAccordionItem>
    );
};

export default CreateChiTietPhieuXuat;