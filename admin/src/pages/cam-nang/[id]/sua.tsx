import { useDocumentTitle } from '@mantine/hooks';
import { useParams } from 'react-router-dom';

import LoadingWrapper from '../../../components/Utils/Wrappers/LoadingWrapper';
import EditCamNang from '../../../components/CamNang/Edit/EditCamNang';
import NotFound from '../../../components/Utils/Errors/NotFound';

import { camNangHooks } from '../../../graphql/queries';

interface Props {
    title: string;
}

const EditCamNangPage = ({ title }: Props) => {
    const { id } = useParams();
    const { data, loading, error } = camNangHooks.useCamNangByID(id || '');

    useDocumentTitle(
        `Cẩm nang: ${data && data.camNang.byID
            ? data.camNang.byID.tieuDe
            : 'Đang tải...'} | Chỉnh sửa - ${title}`
    );

    if (error || !id || (data && data.camNang.byID === null)) {
        return <NotFound />;
    }

    return (
        <LoadingWrapper loading={loading}>
            {data && data.camNang.byID &&
                <EditCamNang
                    data={data.camNang.byID}
                />
            }
        </LoadingWrapper>
    );
};

export default EditCamNangPage;