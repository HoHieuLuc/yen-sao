import { ChangePasswordVars, CurrentUser, LoginData, LoginVars, User } from '../../types';
import { gql, useApolloClient, useLazyQuery, useMutation } from '@apollo/client';
import { showErrorNotification, showSuccessNotification } from '../../events';

const LOGIN = gql`
    mutation Login($username: String!, $password: String!) {
        user {
            login(username: $username, password: $password) {
                value
            }
        }
    }
`;

const LOGOUT = gql`
    mutation Logout {
        user {
            logout
        }
    }
`;

const ME = gql`
    query Me {
        user {
            me {
                id
                username
                email
                fullname
                role
            }
        }
    }
`;

const CHANGE_PASSWORD = gql`
    mutation ChangePassword($oldPassword: String!, $newPassword: String!) {
        user {
            changePassword(oldPassword: $oldPassword, newPassword: $newPassword) {
                id
            }
        }
    }
`;

const useLazyCurrentUser = () => {
    return useLazyQuery<
        { user: CurrentUser }
    >(ME, {
        onError: (error) => {
            if (error.networkError && error.networkError.message === 'Failed to fetch') {
                return showErrorNotification('Không thể kết nối đến máy chủ');
            }
            localStorage.removeItem('token');
            location.reload();
        },
    });
};

const useLogin = () => {
    return useMutation<
        { user: LoginData }, LoginVars
    >(LOGIN, {
        onError: (error) => {
            showErrorNotification(error.message);
        },
        onCompleted: (data) => {
            localStorage.setItem('token', data.user.login.value);
        }
    });
};

const useLogout = () => {
    const client = useApolloClient();
    return useMutation(LOGOUT, {
        onCompleted: () => {
            localStorage.removeItem('token');
            void client.resetStore();
        },
        onError: () => location.reload(),
    });
};

const useChangePassword = () => {
    return useMutation<
        never, ChangePasswordVars
    >(CHANGE_PASSWORD, {
        onCompleted: () => {
            showSuccessNotification(`
                Đổi mật khẩu thành công, bạn sẽ được chuyển hướng trong 2 giây
            `);
            localStorage.removeItem('token');
            setTimeout(() => location.replace('/'), 2000);
        },
        onError: (error) => showErrorNotification(error.message),
    });
};

const useReadCurrentUser = () => {
    const client = useApolloClient();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { user: { me } } = client.readQuery<
        { user: { me: User } }
    >({ query: ME })!;
    return me;
};

export const authHooks = {
    useLazyCurrentUser,
    useReadCurrentUser,
    useChangePassword,
    useLogout,
    useLogin,
};