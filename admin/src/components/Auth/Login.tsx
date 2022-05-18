import { useDocumentTitle } from '@mantine/hooks';
import {
    LazyQueryExecFunction,
    OperationVariables,
    useApolloClient,
} from '@apollo/client';
import { useForm } from '@mantine/form';

import {
    PasswordInput,
    TextInput,
    Button,
    Center,
    Title,
    Group,
    Grid,
} from '@mantine/core';

import { CurrentUser, LoginVars } from '../../types';
import { authHooks } from '../../graphql/queries';

interface Props {
    getCurrentUser: LazyQueryExecFunction<{ user: CurrentUser }, OperationVariables>;
}

const Login = ({ getCurrentUser }: Props) => {
    useDocumentTitle('Đăng nhập');
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

    const [login, { loading: loginLoading }] = authHooks.useLogin();

    const handleLogin = (values: LoginVars) => {
        void login({
            variables: values,
            onCompleted: () => {
                client.resetStore().then(() => getCurrentUser()).catch(void (0));
            }
        });
    };

    return (
        <Grid style={{ height: '100vh' }} m={0}>
            <Grid.Col sm={12} md={4}>
                <Center style={{ height: '100%', width: '100%' }}>
                    <div style={{ width: '100%' }}>
                        <Center mb='xs'>
                            <Title>Đăng nhập</Title>
                        </Center>
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
                    </div>
                </Center>
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