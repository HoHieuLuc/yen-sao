import { ActionIcon, Grid, Group, Paper, ScrollArea, Text } from '@mantine/core';
import { LoaiSanPham } from '../../../types';
import Icon from '../../Utils/Icons/Icon';

interface Props {
    loaiSanPham: LoaiSanPham;
    openEditModal: (loaiSanPham: LoaiSanPham) => void;
    openDeleteModal: (loaiSanPham: LoaiSanPham) => void;
}

const LoaiSanPhamItem = ({ loaiSanPham, openEditModal, openDeleteModal }: Props) => {
    return (
        <Grid.Col sm={12} lg={6} xl={4}>
            <Paper shadow='md' p='md' withBorder>
                <Text weight='bold'>{loaiSanPham.tenLoaiSanPham}</Text>
                <ScrollArea style={{ height: '6em' }} offsetScrollbars>
                    <Text style={{ whiteSpace: 'pre-wrap' }}>{loaiSanPham.moTa}</Text>
                </ScrollArea>
                <Group position='right' mt='xs'>
                    <ActionIcon
                        variant='outline'
                        color='green'
                        onClick={() => openEditModal(loaiSanPham)}
                    >
                        <Icon label='Sửa' iconType='edit' />
                    </ActionIcon>
                    <ActionIcon
                        variant='outline'
                        color='red'
                        onClick={() => openDeleteModal(loaiSanPham)}
                    >
                        <Icon label='Xóa' iconType='delete' />
                    </ActionIcon>
                </Group>
            </Paper>
        </Grid.Col>
    );
};

export default LoaiSanPhamItem;