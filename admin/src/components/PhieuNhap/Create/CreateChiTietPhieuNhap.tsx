import { useMutation } from '@apollo/client';
import { showErrorNotification, showSuccessNotification } from '../../../events';
import { chiTietPhieuNhapQuery } from '../../../graphql/queries';
import { ChiTietPhieuNhapFormData } from '../../../types';
import ChiTietPhieuNhapForm from '../Form/ChiTietPhieuNhapForm';

interface Props {
    idPhieuNhap: string;
}

interface CreateVars extends Props {
    payload: ChiTietPhieuNhapFormData
}

const CreateChiTietPhieuNhap = ({ idPhieuNhap }: Props) => {
    const [createChiTietPhieuNhap, { loading }] = useMutation<
        never, CreateVars
    >(chiTietPhieuNhapQuery.CREATE, {
        onError: (error) => showErrorNotification(error.message),
        onCompleted: () => showSuccessNotification('Thêm sản phẩm vào phiếu nhập thành công')
    });

    const handleCreate = (values: ChiTietPhieuNhapFormData) => {
        void createChiTietPhieuNhap({
            variables: {
                idPhieuNhap,
                payload: values
            }
        });
    };

    return (
        <ChiTietPhieuNhapForm
            type='create'
            loading={loading}
            onSubmit={handleCreate}
        />
    );
};

export default CreateChiTietPhieuNhap;