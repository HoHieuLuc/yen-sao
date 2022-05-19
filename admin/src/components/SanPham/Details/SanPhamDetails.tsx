import useGlobalStyles from '../../../utils/global.styles';

import { Center, Grid } from '@mantine/core';
import RichTextEditor from '@mantine/rte';
import ImageDisplay from './ImageDisplay';

import { convertToVND } from '../../../utils/common';
import { SanPham } from '../../../types';

interface Props {
    data: SanPham;
}

const SanPhamDetails = ({ data }: Props) => {
    const { classes } = useGlobalStyles();
    return (
        <>
            <Grid justify='center'>
                {data.anhSanPham.map((url, index) => (
                    <ImageDisplay
                        key={index}
                        anhSanPham={url}
                    />
                ))}
            </Grid>
            <Center><h3>{data.tenSanPham}</h3></Center>
            <Grid gutter={10} mb='sm'>
                <Grid.Col xs={6} md={2}>Số lượng tồn (kg):</Grid.Col>
                <Grid.Col xs={6} md={10}>{data.soLuong / 1000}</Grid.Col>
                <Grid.Col xs={6} md={2}>Giá: </Grid.Col>
                <Grid.Col xs={6} md={10}>
                    {data.donGiaTuyChon
                        ? data.donGiaTuyChon
                        : `Sỉ: ${convertToVND(data.donGiaSi)}/100gram, 
                        Lẻ: ${convertToVND(data.donGiaLe)}/100gram
                        `
                    }
                </Grid.Col>
                {data.xuatXu &&
                    <>
                        <Grid.Col xs={6} md={2}>Xuất xứ:</Grid.Col>
                        <Grid.Col xs={6} md={10}>{data.xuatXu}</Grid.Col>
                    </>
                }
                {data.tags.length > 0 &&
                    <>
                        <Grid.Col xs={6} md={2}>Tags:</Grid.Col>
                        <Grid.Col xs={6} md={10}>
                            {data.tags.join(', ')}
                        </Grid.Col>
                    </>
                }
                <Grid.Col>Mô tả:</Grid.Col>
                <Grid.Col>
                    <RichTextEditor
                        readOnly
                        value={data.moTa}
                        onChange={() => void (0)}
                        placeholder='Sản phẩm này không có mô tả'
                        className={classes.rte}
                    />
                </Grid.Col>
            </Grid>
        </>
    );
};

export default SanPhamDetails;