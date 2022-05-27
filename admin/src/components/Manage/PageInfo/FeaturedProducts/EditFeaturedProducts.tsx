import { useForm } from '@mantine/form';

import SanPhamMultiSelect from '../../../SanPham/Form/SanPhamMultiSelect';
import { Button, Group, Stack } from '@mantine/core';

import { FeaturedProductsData, FeaturedProductsVars } from '../../../../types';
import { pageHooks } from '../../../../graphql/queries';

interface Props {
    data: FeaturedProductsData;
}

const EditFeaturedProducts = ({ data }: Props) => {
    const [updatePhoneNumber, { loading }] = pageHooks.useCreateOrUpdatePage<
        never, FeaturedProductsVars
    >();
    const featuredProductsForm = useForm({
        initialValues: {
            value: data.featuredProducts?.content.value || []
        },
        validate: {
            value: (value) => value.length <= 3 ? null : 'Bạn chỉ có thể chọn 3 sản phẩm'
        }
    });

    const handleSubmit = (values: typeof featuredProductsForm.values) => {
        void updatePhoneNumber({
            variables: {
                name: 'featuredProducts',
                content: {
                    value: values.value,
                }
            },
        });
    };

    return (
        <form onSubmit={featuredProductsForm.onSubmit(handleSubmit)}>
            <Stack spacing='xs'>
                <SanPhamMultiSelect
                    {...featuredProductsForm.getInputProps('value')}
                    label='Sản phẩm tiêu biểu'
                    placeholder='Chọn sản phẩm tiêu biểu'
                    description='Những sản phẩm này sẽ được ưu tiên hiện trên trang quảng bá'
                />
                <Group position='right'>
                    <Button
                        type='submit'
                        loading={loading}
                    >
                        Xác nhận
                    </Button>
                </Group>
            </Stack>
        </form>
    );
};

export default EditFeaturedProducts;