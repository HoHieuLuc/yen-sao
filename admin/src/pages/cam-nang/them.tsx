import { useDocumentTitle } from '@mantine/hooks';

import CreateCamNang from '../../components/CamNang/Create/CreateCamNang';

interface Props {
    title: string;
}

const CreateCamNangPage = ({ title }: Props) => {
    useDocumentTitle(title);

    return (
        <CreateCamNang />
    );
};

export default CreateCamNangPage;