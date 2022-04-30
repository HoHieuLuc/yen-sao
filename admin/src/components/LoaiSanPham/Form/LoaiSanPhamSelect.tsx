import { Loader, Select } from '@mantine/core';
import { useQuery } from '@apollo/client';
import { LoaiSanPham, PageInfo, PaginateVars } from '../../../types';
import { loaiSanPhamQuery } from '../../../graphql/queries';
import { ReactNode } from 'react';
import { useDebouncedSearch } from '../../../hooks';

interface LoaiSanPhamsData {
    loaiSanPham: {
        all: {
            docs: Array<LoaiSanPham>;
            pageInfo: PageInfo;
        }
    }
}

interface SearchVars extends PaginateVars {
    search: string;
}

interface Props {
    loaiSanPhamId: string;
    setLoaiSanPhamId: (loaiSanPhamId: string) => void;
    error: ReactNode;
}

const LoaiSanPhamSelect = (
    { loaiSanPhamId, setLoaiSanPhamId, error }: Props) => {
    const { debouncedSeach, setSearch } = useDebouncedSearch('', 300);

    const { data, loading } = useQuery<
        LoaiSanPhamsData, SearchVars
    >(loaiSanPhamQuery.ALL, {
        variables: {
            page: 1,
            limit: 50,
            search: debouncedSeach,
        }
    });

    const loaiSanPhamData = data ? data.loaiSanPham.all.docs.map(
        (loaiSanPham) => ({
            value: loaiSanPham.id,
            label: loaiSanPham.tenLoaiSanPham,
        })
    ) : [];

    return (
        <Select
            label='Loại sản phẩm'
            placeholder='Chọn loại sản phẩm'
            searchable
            nothingFound={loading ? <Loader /> : 'Không tìm thấy loại sản phẩm nào'}
            data={loaiSanPhamData}
            onSearchChange={setSearch}
            value={loaiSanPhamId}
            onChange={(value) => setLoaiSanPhamId(value || '')}
            error={error}
            clearable
        />
    );
};

export default LoaiSanPhamSelect;