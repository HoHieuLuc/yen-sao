import { Button, Group, PasswordInput, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { CreateUserVars } from '../../../../types';

interface Props {
    onSubmit: (values: CreateUserVars) => void;
    loading: boolean;
}

const UserForm = ({ onSubmit, loading }: Props) => {
    const userForm = useForm({
        initialValues: {
            username: '',
            password: '',
            confirmPassword: '',
            email: '',
            fullname: '',
        },
        validate: {
            username: (value) => {
                if(value.length < 6) {
                    return 'Tài khoản phải có ít nhất 6 ký tự';
                }
                if (!/^[a-zA-Z0-9]+$/.test(value)) {
                    return 'Tài khoản không hợp lệ';
                }
                return null;
            },
            password: (value) => value.length >= 8 ? null : 'Mật khẩu phải từ 8 kí tự trở lên',
            confirmPassword: (value, values) => value === values.password ? null : 'Mật khẩu không khớp',
            email: (value) => /^(.+)@(\S+)$/.test(value) ? null : 'Email không hợp lệ',
            fullname: (value) => value ? null : 'Vui lòng nhập họ và tên',
        }
    });

    const handleSubmit = (values: typeof userForm.values) => {
        onSubmit({
            username: values.username,
            password: values.password,
            email: values.email,
            fullname: values.fullname,
        });
    };

    return (
        <form onSubmit={userForm.onSubmit(handleSubmit)}>
            <Stack spacing='xs'>
                <TextInput
                    label='Tài khoản'
                    placeholder='Nhập tên tài khoản'
                    {...userForm.getInputProps('username')}
                    required
                />
                <PasswordInput
                    label='Mật khẩu'
                    placeholder='Nhập mật khẩu'
                    {...userForm.getInputProps('password')}
                    required
                />
                <PasswordInput
                    label='Xác nhận mật khẩu'
                    placeholder='Nhập lại mật khẩu'
                    {...userForm.getInputProps('confirmPassword')}
                    required
                />
                <TextInput
                    label='Email'
                    placeholder='Nhập email'
                    {...userForm.getInputProps('email')}
                    required
                />
                <TextInput
                    label='Tên nhân viên'
                    placeholder='Nhập tên nhân viên'
                    {...userForm.getInputProps('fullname')}
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
    );
};

export default UserForm;