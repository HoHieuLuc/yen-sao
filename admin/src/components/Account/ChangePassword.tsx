import { useForm } from '@mantine/form';

import { Button, Center, Container, Group, PasswordInput, Stack, Title } from '@mantine/core';
import { authHooks } from '../../graphql/queries';

const ChangePassword = () => {
    const [changePassword, { loading }] = authHooks.useChangePassword();

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
            },
            onCompleted: () => authForm.reset()
        });
    };

    return (
        <form onSubmit={authForm.onSubmit(handleSubmit)} spellCheck={false}>
            <Center>
                <Title>Đổi mật khẩu</Title>
            </Center>
            <Container>
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
            </Container>
        </form>
    );
};

export default ChangePassword;