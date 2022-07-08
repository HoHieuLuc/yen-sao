import { useDocumentTitle } from '@mantine/hooks';

import PhieuNhapList from '../../components/PhieuNhap/List/PhieuNhapList';

interface Props {
    title: string;
}

const PhieuNhapPage = ({ title }: Props) => {
    useDocumentTitle(title);

    return (
        <PhieuNhapList />
    );
};

export default PhieuNhapPage;