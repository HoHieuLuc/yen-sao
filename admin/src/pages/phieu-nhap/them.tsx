import { useDocumentTitle } from '@mantine/hooks';

import CreatePhieuNhap from '../../components/PhieuNhap/Create/CreatePhieuNhap';

interface Props {
    title: string;
}

const CreatePhieuNhapPage = ({ title }: Props) => {
    useDocumentTitle(title);

    return (
        <CreatePhieuNhap />
    );
};

export default CreatePhieuNhapPage;