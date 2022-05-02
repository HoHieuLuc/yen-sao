import { useQuery } from '@apollo/client';
import { Box, Center, Title } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { phieuNhapQuery } from '../../../graphql/queries';
import { PhieuNhap } from '../../../types';
import NotFound from '../../Utils/Errors/NotFound';
import LoadingWrapper from '../../Utils/Wrappers/LoadingWrapper';

interface PhieuNhapByID {
    phieuNhap: {
        byID: PhieuNhap;
    }
}

const PhieuNhapDetails = () => {
    const { id } = useParams();
    const { data, loading, error } = useQuery<
        PhieuNhapByID, { id: string }
    >(phieuNhapQuery.BY_ID, {
        variables: {
            id: id || ''
        }
    });

    if (error || (data && data.phieuNhap && data.phieuNhap.byID === null)) {
        return <NotFound />;
    }

    return (
        <LoadingWrapper loading={loading}>
            {(data && data.phieuNhap.byID) && <Box>
                <Center>
                    <Title>Chi tiết phiếu nhập</Title>
                </Center>
                {data.phieuNhap.byID.id}
            </Box>}

        </LoadingWrapper>
    );
};

export default PhieuNhapDetails;