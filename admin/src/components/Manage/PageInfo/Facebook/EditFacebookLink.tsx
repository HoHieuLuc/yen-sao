import { useForm } from '@mantine/form';

import { Button, Group, Stack, TextInput } from '@mantine/core';

import { FacebookLinkData, FacebookLinkVars } from '../../../../types';
import { pageHooks } from '../../../../graphql/queries';

interface Props {
    data: FacebookLinkData;
}

const EditFacebookLink = ({ data }: Props) => {
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

export default EditFacebookLink;