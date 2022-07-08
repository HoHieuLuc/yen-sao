import { useDocumentTitle } from '@mantine/hooks';
import { useParams } from 'react-router-dom';

import LoadingWrapper from '../../../components/Utils/Wrappers/LoadingWrapper';
import EditSanPham from '../../../components/SanPham/Edit/EditSanPham';
import NotFound from '../../../components/Utils/Errors/NotFound';

import { sanPhamHooks } from '../../../graphql/queries';


interface Props {
    title: string;
}

const EditSanPhamPage = ({ title }: Props) => {
    const { id } = useParams();
    const { data, loading, error } = sanPhamHooks.useSanPhamByID(id || '');

    useDocumentTitle(
        `${data && data.sanPham.byID
            ? `${data.sanPham.byID.tenSanPham}`
            : 'Đang tải...'} | Chỉnh sửa - ${title}`
    );

    if (error || !id || (data && !data.sanPham.byID)) {
        return <NotFound />;
    }

    return (
        <LoadingWrapper loading={loading}>
            {data && data.sanPham.byID &&
                <EditSanPham
                    data={data.sanPham.byID}
                />
            }
        </LoadingWrapper>
    );
};

export default EditSanPhamPage;