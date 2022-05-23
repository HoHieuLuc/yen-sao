import { useForm } from '@mantine/form';

import { Button, Group, MultiSelect, Stack } from '@mantine/core';

import { PhoneNumberData, PhoneNumberVars } from '../../../../types';
import { pageHooks } from '../../../../graphql/queries';

interface Props {
    data: PhoneNumberData;
}

const EditPhoneNumber = ({ data }: Props) => {
    const [updatePhoneNumber, { loading }] = pageHooks.useCreateOrUpdatePage<
        PhoneNumberData, PhoneNumberVars
    >();
    const phoneNumberForm = useForm({
        initialValues: {
            value: data.page.byName?.content.value || []
        },
        validate: {
            value: (value) => value.length > 0 ? null : 'Vui lòng nhập số điện thoại'
        }
    });

    const handleSubmit = (values: typeof phoneNumberForm.values) => {
        void updatePhoneNumber({
            variables: {
                name: 'phone',
                content: {
                    value: values.value
                }
            }
        });
    };

    return (
        <form onSubmit={phoneNumberForm.onSubmit(handleSubmit)}>
            <Stack spacing='xs'>
                <MultiSelect
                    label='Số điện thoại'
                    placeholder='Nhập số điện thoại'
                    {...phoneNumberForm.getInputProps('value')}
                    data={data.page.byName?.content.value || []}
                    searchable
                    creatable
                    getCreateLabel={(query) => `+ Thêm ${query}`}
                    onCreate={(query) =>
                        phoneNumberForm.setFieldValue(
                            'value', [...phoneNumberForm.values.value, query]
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

export default EditPhoneNumber;