import { useQuery } from '@apollo/client';
import { Box, Center, Grid, Paper, Text, Title } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { sanPhamQuery } from '../../../graphql/queries';
import { SanPham } from '../../../types';
import NotFound from '../../Utils/Errors/NotFound';
import LoadingWrapper from '../../Utils/Wrappers/LoadingWrapper';
import ImageDisplay from './ImageDisplay';

interface SanPhamByID {
    sanPham: {
        byID: SanPham
    }
}

const SanPhamDetails = () => {
    const { id } = useParams();
    const { data, loading, error } = useQuery<
        SanPhamByID, { id: string }
    >(sanPhamQuery.BY_ID, {
        variables: {
            id: id || ''
        }
    });

    if (error || (data && data.sanPham && data.sanPham.byID === null)) {
        return <NotFound />;
    }

    return (
        <LoadingWrapper loading={loading}><>
            {data && <Box>
                <Center>
                    <Title>Chi tiết sản phẩm</Title>
                </Center>
                <Grid justify='center'>
                    {data.sanPham.byID.anhSanPham.map((url, index) => (
                        <ImageDisplay
                            key={index}
                            anhSanPham={url}
                        />
                    ))}
                </Grid>
                <Center><h3>{data.sanPham.byID.tenSanPham}</h3></Center>
                <Grid gutter={10}>
                    <Grid.Col xs={6} md={2}>Loại:</Grid.Col>
                    <Grid.Col xs={6} md={10}>
                        {data.sanPham.byID.loaiSanPham.tenLoaiSanPham}
                    </Grid.Col>
                    <Grid.Col xs={6} md={2}>Số lượng tồn:</Grid.Col>
                    <Grid.Col xs={6} md={10}>{data.sanPham.byID.soLuong}</Grid.Col>
                    <Grid.Col>Mô tả:</Grid.Col>
                    <Grid.Col>
                        <Paper shadow='xs' withBorder p='sm'>
                            <Text style={{ whiteSpace: 'pre-wrap' }}>
                                {data.sanPham.byID.moTa}
                            </Text>
                        </Paper>
                    </Grid.Col>
                </Grid>
            </Box>}
        </></LoadingWrapper>
    );
};

export default SanPhamDetails;