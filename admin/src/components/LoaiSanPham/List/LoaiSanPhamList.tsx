import { useQuery } from '@apollo/client';
import { useSearchParams } from 'react-router-dom';
import { useModals } from '@mantine/modals';

import {
    ActionIcon,
    Center,
    Grid,
    Group,
    Pagination,
    Paper,
    ScrollArea,
    Text
} from '@mantine/core';


import { LoaiSanPham, PageInfo, PaginateVars } from '../../../types';
import { ALL_LOAI_SAN_PHAMS } from '../../../graphql/queries';

import ErrorPage from '../../Errors/ErrorPage';
import LoadingWrapper from '../../Wrapper/LoadingWrapper';
import EditIcon from '../../Icons/EditIcon';
import EditLoaiSanPham from '../Edit/EditLoaiSanPham';

interface LoaiSanPhamsData {
    loaiSanPham: {
        all: {
            loaiSanPhams: Array<LoaiSanPham>;
            pageInfo: PageInfo;
        }
    }
}

const LoaiSanPhamList = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get('page') || '1');
    const { data, loading, error } = useQuery<
        LoaiSanPhamsData, PaginateVars
    >(ALL_LOAI_SAN_PHAMS, {
        variables: {
            page: currentPage,
            limit: 6,
        }
    });

    const editModal = useModals();

    const openEditModal = (loaiSanPham: LoaiSanPham) => {
        const modalId = editModal.openModal({
            title: 'Chỉnh sửa',
            children: <>
                <EditLoaiSanPham
                    {...loaiSanPham}
                    closeModal={() => editModal.closeModal(modalId)}
                />
            </>
        });
    };

    const handlePageChange = (page: number) => {
        setSearchParams({
            page: page.toString()
        });
    };

    if (error) {
        return <ErrorPage />;
    }

    const loaiSanPhamElements = data?.loaiSanPham.all.loaiSanPhams.map(
        (loaiSanPham) => (
            <Grid.Col sm={12} lg={6} xl={4} key={loaiSanPham.id}>
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
                            <EditIcon />
                        </ActionIcon>
                    </Group>
                </Paper>
            </Grid.Col>
        )
    );

    return (
        <LoadingWrapper loading={loading}>
            <>
                <Grid align='stretch'>
                    {loaiSanPhamElements}
                </Grid>
                {data && <Center mt='sm'>
                    <Pagination
                        total={data.loaiSanPham.all.pageInfo.totalPages}
                        siblings={1}
                        page={currentPage}
                        onChange={handlePageChange}
                    />
                </Center>}
            </>
        </LoadingWrapper>
    );
};

export default LoaiSanPhamList;