import { useDocumentTitle } from '@mantine/hooks';

import PhieuXuatList from '../../components/PhieuXuat/List/PhieuXuatList';

interface Props {
    title: string;
}

const PhieuXuatPage = ({ title }: Props) => {
    useDocumentTitle(title);

    return (
        <PhieuXuatList />
    );
};

export default PhieuXuatPage;