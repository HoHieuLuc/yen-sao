import useGlobalStyles from '../../../utils/global.styles';
import { useUpload } from '../../../hooks';
import { useForm } from '@mantine/form';

import ImageDropzone from '../../Utils/ImageDropzone/ImageDropzone';
import {
    InputWrapper, Stack, Switch, TextInput, Image,
    Accordion, Button, Center, Group
} from '@mantine/core';
import RichTextEditor from '@mantine/rte';

import { authHooks } from '../../../graphql/queries';
import { CamNangFormData } from '../../../types';

interface Props {
    loading: boolean;
    onSubmit: (values: CamNangFormData) => void;
    inititalValues?: CamNangFormData;
}

const CamNangForm = ({ loading, onSubmit, inititalValues }: Props) => {
    const { classes } = useGlobalStyles();
    const { singleUpload } = useUpload();
    const me = authHooks.useReadCurrentUser();

    const camNangForm = useForm<CamNangFormData>({
        initialValues: {
            tieuDe: inititalValues?.tieuDe || '',
            noiDung: inititalValues?.noiDung || '',
            isPublic: inititalValues?.isPublic || false,
            anhDaiDien: inititalValues?.anhDaiDien || '',
        },
        validate: {
            tieuDe: (value) => value ? undefined : 'Vui lòng nhập tiêu đề',
        }
    });

    return (
        <form onSubmit={camNangForm.onSubmit(onSubmit)} spellCheck={false}>
            <Stack spacing='xs'>
                <TextInput
                    label='Tiêu đề'
                    placeholder='Nhập tiêu đề'
                    {...camNangForm.getInputProps('tieuDe')}
                    disabled={me.role !== 'admin' && camNangForm.values.isPublic}
                    required
                />
                <InputWrapper
                    label='Nội dung'
                    {...camNangForm.getInputProps('noiDung')}
                    required
                >
                    <RichTextEditor
                        placeholder='Nhập nội dung'
                        {...camNangForm.getInputProps('noiDung')}
                        readOnly={me.role !== 'admin' && camNangForm.values.isPublic}
                        onImageUpload={singleUpload}
                        className={classes.rte}
                        stickyOffset={50}
                        sticky
                    />
                </InputWrapper>
                <Accordion>
                    <Accordion.Item label='Ảnh đại diện'>
                        {me.role !== 'admin' && camNangForm.values.isPublic
                            ? <Center>
                                <Image
                                    src={camNangForm.values.anhDaiDien}
                                    withPlaceholder
                                    alt='Ảnh sản phẩm'
                                    fit='contain'
                                />
                            </Center>
                            : <ImageDropzone
                                images={camNangForm.values.anhDaiDien
                                    ? [camNangForm.values.anhDaiDien]
                                    : []
                                }
                                onChange={(imageUrls) =>
                                    camNangForm.setFieldValue('anhDaiDien', imageUrls[0])
                                }
                                onRemoveImage={() =>
                                    camNangForm.setFieldValue('anhDaiDien', '')
                                }
                                maxLength={1}
                            />
                        }
                    </Accordion.Item>
                </Accordion>
                <Switch
                    label='Công khai cẩm nang (Chỉ cẩm nang công khai mới hiện trên trang quảng bá)'
                    {...camNangForm.getInputProps('isPublic')}
                    checked={camNangForm.values.isPublic}
                    disabled={me.role !== 'admin'}
                />
                <Group position='right'>
                    <Button
                        type='submit'
                        loading={loading}
                        disabled={me.role !== 'admin' && camNangForm.values.isPublic}
                    >
                        Xác nhận
                    </Button>
                </Group>
            </Stack>
        </form>
    );
};

export default CamNangForm;