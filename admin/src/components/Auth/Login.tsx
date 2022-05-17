import {
    LazyQueryExecFunction,
    OperationVariables,
    useApolloClient,
    useMutation,
} from '@apollo/client';
import { useForm } from '@mantine/form';

import {
    PasswordInput,
    TextInput,
    Button,
    Group,
    Grid,
    Box,
} from '@mantine/core';

import { showErrorNotification } from '../../events';
import { authQuery } from '../../graphql/queries';
import { CurrentUser } from '../../App';

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
    >(authQuery.LOGIN, {
        onError: (error) => {
            showErrorNotification(error.message);
        },
        onCompleted: (data) => {
            localStorage.setItem('token', data.user.login.value);
            client.resetStore().then(() => getCurrentUser()).catch(void (0));
        }
    });

    const handleLogin = (values: LoginVars) => {
        void login({
            variables: values
        });
    };

    return (
        <Grid align='stretch' style={{ height: '100vh' }} m={0}>
            <Grid.Col sm={12} md={4} style={{
                display: 'table',
                height: '100%',
                width: '100%',
            }}>
                <Box p='xs' style={{
                    display: 'table-cell',
                    verticalAlign: 'middle'
                }} >
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
                </Box>
            </Grid.Col>
            <Grid.Col sx={(theme) => ({
                [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
                    display: 'none'
                },
                backgroundColor: theme.colors.blue[5]
            })} md={8}></Grid.Col>
        </Grid >
    );
};

export default Login;