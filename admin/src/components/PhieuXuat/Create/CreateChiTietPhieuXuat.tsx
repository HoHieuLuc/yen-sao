import MyAccordionItem from '../../Utils/AccordionItem/MyAccordionItem';
import ChiTietPhieuXuatForm from '../Form/ChiTietPhieuXuatForm';

import { chiTietPhieuXuatHooks } from '../../../graphql/queries';
import { ChiTietPhieuXuatInput } from '../../../types';

interface Props {
    label: string;
    idPhieuXuat: string;
}

const CreateChiTietPhieuXuat = ({ idPhieuXuat, label }: Props) => {
    const [createChiTietPhieuXuat, { loading }] = chiTietPhieuXuatHooks.useCreateChiTietPhieuXuat();

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