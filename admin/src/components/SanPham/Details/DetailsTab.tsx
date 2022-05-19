import useGlobalStyles from '../../../utils/global.styles';
import { Link, useNavigate } from 'react-router-dom';
import { useModals } from '@mantine/modals';

import { Box, Button, Center, Grid, Group, Title } from '@mantine/core';
import LoadingWrapper from '../../Utils/Wrappers/LoadingWrapper';
import DeleteSanPham from '../Delete/DeleteSanPham';
import NotFound from '../../Utils/Errors/NotFound';
import RichTextEditor from '@mantine/rte';
import ImageDisplay from './ImageDisplay';

import { SanPham, SanPhamByID } from '../../../types';
import { convertToVND } from '../../../utils/common';
import { ApolloError } from '@apollo/client';
import { authHooks } from '../../../graphql/queries';

interface Props {
    id: string;
    data: SanPhamByID | undefined;
    loading: boolean;
    error?: ApolloError | undefined;
}

const DetailsTab = ({ id, data, loading, error }: Props) => {
    const navigate = useNavigate();
    const { classes } = useGlobalStyles();
    const me = authHooks.useReadCurrentUser();

    const modals = useModals();
    const openDeleteModal = (sanPham: SanPham) => {
        const modalId = modals.openModal({
            title: <h3>Xóa phiếu nhập</h3>,
            children: <DeleteSanPham
                sanPham={sanPham}
                closeModal={() => modals.closeModal(modalId)}
                callback={() => navigate('/san-pham')}
            />
        });
    };

    if (error || (data && data.sanPham && data.sanPham.byID === null)) {
        return <NotFound />;
    }

    return (
        <LoadingWrapper loading={loading}>
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
                <Grid gutter={10} mb='sm'>
                    <Grid.Col xs={6} md={2}>Số lượng tồn (kg):</Grid.Col>
                    <Grid.Col xs={6} md={10}>{data.sanPham.byID.soLuong / 1000}</Grid.Col>
                    <Grid.Col xs={6} md={2}>Giá: </Grid.Col>
                    <Grid.Col xs={6} md={10}>
                        {data.sanPham.byID.donGiaTuyChon
                            ? data.sanPham.byID.donGiaTuyChon
                            : `Sỉ: ${convertToVND(data.sanPham.byID.donGiaSi)}/100gram, 
                            Lẻ: ${convertToVND(data.sanPham.byID.donGiaLe)}/100gram
                            `
                        }
                    </Grid.Col>
                    {data.sanPham.byID.xuatXu &&
                        <>
                            <Grid.Col xs={6} md={2}>Xuất xứ:</Grid.Col>
                            <Grid.Col xs={6} md={10}>{data.sanPham.byID.xuatXu}</Grid.Col>
                        </>
                    }
                    {data.sanPham.byID.tags.length > 0 &&
                        <>
                            <Grid.Col xs={6} md={2}>Tags:</Grid.Col>
                            <Grid.Col xs={6} md={10}>
                                {data.sanPham.byID.tags.join(', ')}
                            </Grid.Col>
                        </>
                    }
                    <Grid.Col>Mô tả:</Grid.Col>
                    <Grid.Col>
                        <RichTextEditor
                            readOnly
                            value={data.sanPham.byID.moTa}
                            onChange={() => void (0)}
                            placeholder='Sản phẩm này không có mô tả'
                            className={classes.rte}
                        />
                    </Grid.Col>
                </Grid>
                {me.role === 'admin' && <Group position='right'>
                    <Button
                        color='red'
                        onClick={() => openDeleteModal(data.sanPham.byID)}
                    >
                        Xóa
                    </Button>
                    <Button
                        component={Link}
                        to={`/san-pham/${id}/sua`}
                        color='teal'
                    >
                        Sửa
                    </Button>
                </Group>}
            </Box>}
        </LoadingWrapper>
    );
};

export default DetailsTab;