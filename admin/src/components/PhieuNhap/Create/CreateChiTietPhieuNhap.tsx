import MyAccordionItem from '../../Utils/AccordionItem/MyAccordionItem';
import ChiTietPhieuNhapForm from '../Form/ChiTietPhieuNhapForm';

import { chiTietPhieuNhapHooks } from '../../../graphql/queries';
import { ChiTietPhieuNhapInput } from '../../../types';

interface Props {
    label: string;
    idPhieuNhap: string;
}

const CreateChiTietPhieuNhap = ({ label, idPhieuNhap }: Props) => {
    const [createChiTietPhieuNhap, { loading }] = chiTietPhieuNhapHooks.useCreateChiTietPhieuNhap();

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