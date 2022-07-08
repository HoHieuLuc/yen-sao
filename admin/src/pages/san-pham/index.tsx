import { useDocumentTitle } from '@mantine/hooks';

import SanPhamList from '../../components/SanPham/List/SanPhamList';

interface Props {
    title: string;
}

const SanPhamPage = ({ title }: Props) => {
    useDocumentTitle(title);

    return (
        <SanPhamList />
    );
};

export default SanPhamPage;