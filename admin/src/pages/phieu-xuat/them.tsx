import { useDocumentTitle } from '@mantine/hooks';

import CreatePhieuXuat from '../../components/PhieuXuat/Create/CreatePhieuXuat';

interface Props {
    title: string;
}

const CreatePhieuXuatPage = ({ title }: Props) => {
    useDocumentTitle(title);
  
    return (
        <CreatePhieuXuat />
    );
};

export default CreatePhieuXuatPage;