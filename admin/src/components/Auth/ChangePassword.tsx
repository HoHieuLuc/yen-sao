import { useMutation } from '@apollo/client';
import { Box, Button, Center, Container, Group, PasswordInput, Stack, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showErrorNotification, showSuccessNotification } from '../../events';
import { authQuery } from '../../graphql/queries';

interface ChangePasswordVars {
    oldPassword: string;
    newPassword: string;
}

const ChangePassword = () => {
    const [changePassword, { loading }] = useMutation<
        never, ChangePasswordVars
    >(authQuery.CHANGE_PASSWORD, {
        onCompleted: () => showSuccessNotification('Đổi mật khẩu thành công'),
        onError: (error) => showErrorNotification(error.message),
    });

    const authForm = useForm({
        initialValues: {
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        },
        validate: {
            oldPassword: (value) => value ? null : 'Bạn chưa nhập mật khẩu cũ',
            newPassword: (value) => value.length >= 8 ? null : 'Mật khẩu phải có ít nhất 8 ký tự',
            confirmPassword: (value, values) =>
                value === values.newPassword ? null : 'Mật khẩu xác nhận không khớp'
        }
    });

    const handleSubmit = (values: typeof authForm.values) => {
        void changePassword({
            variables: {
                oldPassword: values.oldPassword,
                newPassword: values.newPassword
            }
        });
    };

    return (
        <Box>
            <Center>
                <Title>Đổi mật khẩu</Title>
            </Center>
            <Container>
                <form onSubmit={authForm.onSubmit(handleSubmit)}>
                    <Stack spacing='xs'>
                        <PasswordInput
                            label='Mật khẩu cũ'
                            placeholder='Nhập mật khẩu cũ'
                            {...authForm.getInputProps('oldPassword')}
                            required
                        />
                        <PasswordInput
                            label='Mật khẩu mới'
                            placeholder='Nhập mật khẩu mới'
                            {...authForm.getInputProps('newPassword')}
                            description='Mật khẩu phải có ít nhất 8 ký tự'
                            required
                        />
                        <PasswordInput
                            label='Xác nhận mật khẩu'
                            placeholder='Nhập lại mật khẩu mới'
                            {...authForm.getInputProps('confirmPassword')}
                            required
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
            </Container>
        </Box>
    );
};

export default ChangePassword;