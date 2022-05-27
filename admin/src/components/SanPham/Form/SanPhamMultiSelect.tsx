import { useQuery, gql } from '@apollo/client';

import { Loader, MultiSelect } from '@mantine/core';

import { GetInputPropsPayload } from '@mantine/form/lib/types';
import { AllSanPhams, AllSanPhamVars } from '../../../types';

type Props = GetInputPropsPayload & {
    label: string;
    description: string;
    placeholder: string;
};

const SanPhamMultiSelect = (props: Props) => {
    const { data, loading } = useQuery<AllSanPhams, AllSanPhamVars>(
        gql`
            query AllSanPhams($page: Int!, $limit: Int!, $search: String) {
                sanPham {
                    all(page: $page, limit: $limit, search: $search) {
                        docs {
                            id
                            tenSanPham
                        }
                    }
                }
            }
        `,
        {
            variables: {
                page: 1,
                limit: 100000,
                search: ''
            }
        }
    );

    const sanPhamData = data ? data.sanPham.all.docs.map(
        (sanPham) => ({
            value: sanPham.id,
            label: sanPham.tenSanPham,
        })
    ) : [];

    return (
        <MultiSelect
            nothingFound={loading ? <Loader /> : 'Không tìm thấy sản phẩm nào'}
            data={sanPhamData}
            {...props}
            searchable
            clearable
        />
    );
};

export default SanPhamMultiSelect;