import {
    TextInput,
    PasswordInput,
    Button,
    Container,
    Group,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMutation, LazyQueryExecFunction, OperationVariables, useApolloClient } from '@apollo/client';
import { LOGIN } from '../../graphql/queries/auth';
import { CurrentUser } from '../../App';
import { showErrorNotification } from '../../events';

interface LoginData {
    login: {
        value: string;
    }
}

interface LoginVars {
    username: string;
    password: string;
}

interface Props {
    getCurrentUser: LazyQueryExecFunction<{ user: CurrentUser }, OperationVariables>;
}

const Login = ({ getCurrentUser }: Props) => {
    const client = useApolloClient();
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

    const [login, { loading: loginLoading }] = useMutation<
        { user: LoginData }, LoginVars
    >(LOGIN, {
        onError: (error) => {
            console.log(error);
            showErrorNotification(error.message);
        },
        onCompleted: (data) => {
            localStorage.setItem('token', data.user.login.value);
            client.resetStore().then(() => getCurrentUser()).catch(void(0));
        }
    });

    const handleLogin = (values: LoginVars) => {
        void login({
            variables: values
        });
    };

    return (
        <Container fluid>
            <Container className='vertical-center'>
                <form onSubmit={loginForm.onSubmit(handleLogin)}>
                    <TextInput
                        label='Tên đăng nhập'
                        placeholder='Nhập tên đăng nhập'
                        {...loginForm.getInputProps('username')}
                    />
                    <PasswordInput
                        label='Mật khẩu'
                        placeholder='Nhập mật khẩu'
                        {...loginForm.getInputProps('password')}
                    />
                    <Group position='right' mt='md'>
                        <Button type='submit' loading={loginLoading}>Đăng nhập</Button>
                    </Group>
                </form>
            </Container>
        </Container>
    );
};

export default Login;