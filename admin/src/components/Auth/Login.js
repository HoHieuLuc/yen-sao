import {
    TextInput,
    Button,
    Container,
    Group
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../graphql/queries/auth';
import { showNotification } from '@mantine/notifications';

const Login = ({ getCurrentUser }) => {
    const loginForm = useForm({
        initialValues: {
            username: '',
            password: ''
        },
        validate: {
            username: (value) => value ? null : 'Vui lòng nhập tên đăng nhập',
            password: (value) => value ? null : 'Vui lòng nhập mật khẩu'
        }
    });

    const [login, { loading: loginLoading }] = useMutation(LOGIN, {
        onError: (error) => {
            console.log(error);
            showNotification({
                title: 'Thông báo',
                message: error.message,
                color: 'red',
            });
        },
        onCompleted: (data) => {
            localStorage.setItem('token', data.login.value);
            getCurrentUser();
        }
    });

    const handleLogin = (values) => {
        login({
            variables: values
        });
    };

    return (
        <Container className='vertical-center'>
            <form onSubmit={loginForm.onSubmit(handleLogin)}>
                <TextInput
                    label='Tên đăng nhập'
                    placeholder='Nhập tên đăng nhập'
                    {...loginForm.getInputProps('username')}
                />
                <TextInput
                    label='Mật khẩu'
                    placeholder='Nhập mật khẩu'
                    type='password'
                    {...loginForm.getInputProps('password')}
                />
                <Group position='right' mt='md'>
                    <Button type='submit' loading={loginLoading}>Đăng nhập</Button>
                </Group>
            </form>
        </Container>
    );
};

export default Login;