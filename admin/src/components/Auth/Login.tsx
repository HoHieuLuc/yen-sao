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
    Box,
} from '@mantine/core';

import { CurrentUser, LoginVars } from '../../types';
import { authHooks } from '../../graphql/queries';
import appConfig from '../../config';

interface Props {
    getCurrentUser: LazyQueryExecFunction<{ user: CurrentUser }, OperationVariables>;
}

const Login = ({ getCurrentUser }: Props) => {
    useDocumentTitle(`Đăng nhập - ${appConfig.title}`);
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
        <Box
            sx={(theme) => ({
                height: '100vh',
                backgroundImage: theme.colorScheme === 'light' ? theme.fn.linearGradient(
                    133,
                    theme.colors.violet[1],
                    theme.colors.violet[6],
                ) : 'none'
            })}
        >
            <Center style={{ height: '100%', width: '100%' }}>
                <Box sx={(theme) => ({
                    width: theme.breakpoints.xs,
                    padding: theme.spacing.xs,
                    backgroundColor: theme.colorScheme === 'light' ? 'white' : 'none',
                    borderRadius: theme.radius.md,
                    boxShadow: theme.shadows.md
                })}>
                    <Center mb='xs'>
                        <Title>Đăng nhập</Title>
                    </Center>
                    <form onSubmit={loginForm.onSubmit(handleLogin)} spellCheck={false}>
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
            </Center>
        </Box >
    );
};

export default Login;