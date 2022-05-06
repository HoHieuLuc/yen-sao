import { useApolloClient, useQuery, gql } from '@apollo/client';
import { useDebouncedSearch } from '../../../hooks';

import { Loader, Select } from '@mantine/core';

import { PageInfo, PaginateVars, SanPham } from '../../../types';
import { sanPhamQuery } from '../../../graphql/queries';
import { ReactNode } from 'react';

interface SanPhamsData {
    sanPham: {
        all: {
            docs: Array<SanPham>;
            pageInfo: PageInfo;
        }
    }
}

interface SearchVars extends PaginateVars {
    search: string;
}

interface Props {
    maSanPham: string;
    setMaSanPham: (maSanPham: string) => void;
    error: ReactNode;
}

const SanPhamSelect = ({ maSanPham, setMaSanPham, error }: Props) => {
    const { debouncedSeach, setSearch } = useDebouncedSearch('', 300);
    const client = useApolloClient();

    const { data, loading } = useQuery<
        SanPhamsData, SearchVars
    >(sanPhamQuery.ALL, {
        variables: {
            page: 1,
            limit: 50,
            search: debouncedSeach,
        }
    });

    const sanPhamData = data ? data.sanPham.all.docs.map(
        (sanPham) => ({
            value: sanPham.id,
            label: sanPham.tenSanPham,
        })
    ) : [];

    const sanPham = client.readFragment<{ soLuong: number }>({
        id: `SanPham:${maSanPham}`,
        fragment: gql`
            fragment SoLuongTonFragment on SanPham {
                soLuong
            }
        `
    });

    return (
        <Select
            label='Tên sản phẩm'
            placeholder='Chọn loại sản phẩm'
            searchable
            nothingFound={loading ? <Loader /> : 'Không tìm thấy sản phẩm nào'}
            data={sanPhamData}
            onSearchChange={setSearch}
            value={maSanPham}
            onChange={(value) => setMaSanPham(value || '')}
            error={error}
            clearable
            description={sanPham ? `Số lượng tồn: ${sanPham.soLuong}` : ''}
        />
    );
};

export default SanPhamSelect;