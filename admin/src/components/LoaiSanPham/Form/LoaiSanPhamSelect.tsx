import { Loader, Select } from '@mantine/core';
import { useQuery } from '@apollo/client';
import { LoaiSanPham, PageInfo, PaginateVars } from '../../../types';
import { ALL_LOAI_SAN_PHAMS } from '../../../graphql/queries';
import { ReactNode, useState } from 'react';
import { useDebouncedValue } from '@mantine/hooks';

interface LoaiSanPhamsData {
    loaiSanPham: {
        all: {
            loaiSanPhams: Array<LoaiSanPham>;
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

const LoaiSanPhamSelect = ({ loaiSanPhamId, setLoaiSanPhamId, error }: Props) => {
    const [searchLoaiSanPham, setSearchLoaiSanPham] = useState('');
    const [searchDebounced] = useDebouncedValue(searchLoaiSanPham, 300);

    const { data, loading: loaiSanPhamLoading } = useQuery<
        LoaiSanPhamsData, SearchVars
    >(ALL_LOAI_SAN_PHAMS, {
        variables: {
            page: 1,
            limit: 50,
            search: searchDebounced,
        }
    });

    const handleSearchLoaiSanPham = (query: string) => {
        setSearchLoaiSanPham(query);
    };

    const loaiSanPhamData = data ? data.loaiSanPham.all.loaiSanPhams.map(
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
            nothingFound={loaiSanPhamLoading ? <Loader /> : 'Không tìm thấy loại sản phẩm nào'}
            data={loaiSanPhamData}
            onSearchChange={handleSearchLoaiSanPham}
            value={loaiSanPhamId}
            onChange={(value) => setLoaiSanPhamId(value || '')}
            error={error}
        />
    );
};

export default LoaiSanPhamSelect;