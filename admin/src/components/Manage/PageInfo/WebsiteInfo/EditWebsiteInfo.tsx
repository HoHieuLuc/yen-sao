import { useForm } from '@mantine/form';

import { Button, Group, MultiSelect, Stack, TextInput } from '@mantine/core';

import { WebsiteInfo, WebsiteInfoData, WebsiteInfoVars } from '../../../../types';
import { pageHooks } from '../../../../graphql/queries';

interface Props {
    data: WebsiteInfoData;
}

const EditWebsiteInfo = ({ data }: Props) => {
    const [updateWebsiteInfo, { loading }] = pageHooks.useCreateOrUpdatePage<
        never, WebsiteInfoVars
    >();

    const websiteInfoForm = useForm<WebsiteInfo>({
        initialValues: {
            address: data.websiteInfo ? (data.websiteInfo.content.address || []) : [],
            phone: data.websiteInfo ? (data.websiteInfo.content.phone || []) : [],
            facebook: data.websiteInfo ? (data.websiteInfo.content.facebook || '') : '',
        }
    });

    const handleSubmit = (values: typeof websiteInfoForm.values) => {
        void updateWebsiteInfo({
            variables: {
                name: 'websiteInfo',
                content: values,
            }
        });
    };

    return (
        <form onSubmit={websiteInfoForm.onSubmit(handleSubmit)} spellCheck={false}>
            <Stack spacing='xs'>
                <MultiSelect
                    label='Địa chỉ'
                    placeholder='Nhập địa chỉ'
                    {...websiteInfoForm.getInputProps('address')}
                    data={websiteInfoForm.values.address}
                    searchable
                    creatable
                    getCreateLabel={(query) => `+ Thêm ${query}`}
                    onCreate={(query) =>
                        websiteInfoForm.setFieldValue(
                            'address', [...websiteInfoForm.values.address, query]
                        )
                    }
                />
                <MultiSelect
                    label='Số điện thoại'
                    placeholder='Nhập số điện thoại'
                    {...websiteInfoForm.getInputProps('phone')}
                    data={websiteInfoForm.values.phone}
                    searchable
                    creatable
                    getCreateLabel={(query) => `+ Thêm ${query}`}
                    onCreate={(query) =>
                        websiteInfoForm.setFieldValue(
                            'phone', [...websiteInfoForm.values.phone, query]
                        )
                    }
                />
                <TextInput
                    label='Facebook'
                    placeholder='Nhập đường dẫn Facebook'
                    {...websiteInfoForm.getInputProps('facebook')}
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

export default EditWebsiteInfo;