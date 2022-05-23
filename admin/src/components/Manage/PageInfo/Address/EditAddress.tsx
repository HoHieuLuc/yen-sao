import { useForm } from '@mantine/form';

import { Button, Group, MultiSelect, Stack } from '@mantine/core';

import { AddressData, AddressVars } from '../../../../types';
import { pageHooks } from '../../../../graphql/queries';

interface Props {
    data: AddressData;
}

const EditAddress = ({ data }: Props) => {
    const [updateAddress, { loading }] = pageHooks.useCreateOrUpdatePage<
        AddressData, AddressVars
    >();
    const addressForm = useForm({
        initialValues: {
            value: data.page.byName?.content.value || []
        },
        validate: {
            value: (value) => value.length > 0 ? null : 'Vui lòng nhập địa chỉ'
        }
    });

    const handleSubmit = (values: typeof addressForm.values) => {
        void updateAddress({
            variables: {
                name: 'address',
                content: {
                    value: values.value
                }
            }
        });
    };

    return (
        <form onSubmit={addressForm.onSubmit(handleSubmit)}>
            <Stack spacing='xs'>
                <MultiSelect
                    label='Địa chỉ'
                    placeholder='Nhập địa chỉ'
                    {...addressForm.getInputProps('value')}
                    data={data.page.byName?.content.value || []}
                    searchable
                    creatable
                    getCreateLabel={(query) => `+ Thêm ${query}`}
                    onCreate={(query) =>
                        addressForm.setFieldValue(
                            'value', [...addressForm.values.value, query]
                        )
                    }
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

export default EditAddress;