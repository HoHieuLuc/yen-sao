import { useDocumentTitle } from '@mantine/hooks';

import CreateSanPham from '../../components/SanPham/Create/CreateSanPham';

interface Props {
    title: string;
}

const CreateSanPhamPage = ({ title }: Props) => {
    useDocumentTitle(title);

    return (
        <CreateSanPham />
    );
};

export default CreateSanPhamPage;