import { useForm } from '@mantine/form';

import { Button, Group, Stack, TextInput } from '@mantine/core';

import { FacebookLink, FacebookLinkVars } from '../../../../types';
import { pageHooks } from '../../../../graphql/queries';

interface Props {
    data: FacebookLink;
}

const EditAddress = ({ data }: Props) => {
    const [updateFacebookLink, { loading }] = pageHooks.useCreateOrUpdatePage<
        never, FacebookLinkVars
    >();
    const facebookLinkForm = useForm({
        initialValues: {
            value: data.facebook?.content.value || ''
        }
    });

    const handleSubmit = (values: typeof facebookLinkForm.values) => {
        void updateFacebookLink({
            variables: {
                name: 'facebook',
                content: {
                    value: values.value
                }
            }
        });
    };

    return (
        <form onSubmit={facebookLinkForm.onSubmit(handleSubmit)}>
            <Stack spacing='xs'>
                <TextInput
                    label='Facebook'
                    placeholder='Nhập đường dẫn Facebook'
                    {...facebookLinkForm.getInputProps('value')}
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