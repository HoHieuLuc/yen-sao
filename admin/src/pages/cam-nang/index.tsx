import { useDocumentTitle } from '@mantine/hooks';

import CamNangList from '../../components/CamNang/List/CamNangList';

interface Props {
    title: string;
}

const CamNangPage = ({ title }: Props) => {
    useDocumentTitle(title);

    return (
        <CamNangList />
    );
};

export default CamNangPage;